-- 기존 테이블 및 타입 삭제
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS operating_hours CASCADE;
DROP TABLE IF EXISTS space_images CASCADE;
DROP TABLE IF EXISTS spaces CASCADE;
DROP TABLE IF EXISTS space_tags CASCADE;
DROP TABLE IF EXISTS space_discounts CASCADE;
DROP TABLE IF EXISTS space_inquiries CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- Create public.users table (프로필 정보 저장용)
CREATE TABLE public.users (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  aud varchar(255),
  email varchar(255) UNIQUE,
  full_name text,
  phone_number text,
  avatar_url text,
  is_host boolean DEFAULT false,
  provider varchar(255),          -- 'kakao', 'google' 등 OAuth 제공자
  provider_id varchar(255),       -- OAuth provider의 고유 ID
  metadata jsonb,                 -- 추가 메타데이터 (카카오 프로필 정보 등)
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(provider, provider_id)   -- provider_id는 각 제공자별로 유니크해야 함
);

-- 공간 카테고리 테이블
CREATE TABLE categories (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  icon_url text,
  parent_id uuid REFERENCES categories(id),    -- 상위 카테고리 (예: 모임>파티룸)
  is_active boolean DEFAULT true,
  display_order int                            -- 카테고리 표시 순서
);

-- 공간 정보 테이블
CREATE TABLE spaces (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  host_id uuid REFERENCES users(id),
  category_id uuid REFERENCES categories(id),
  name text NOT NULL,
  description text,
  address text NOT NULL,
  detailed_address text,
  latitude numeric,
  longitude numeric,
  max_capacity int,
  base_price numeric NOT NULL,
  minimum_hours int DEFAULT 1,
  amenities jsonb,                              -- 편의시설
  rules text[],                                 -- 이용규칙
  status text DEFAULT 'active',
  cancellation_policy text,                     -- 취소 정책
  preparation_time int DEFAULT 0,               -- 준비시간 (분)
  cleanup_time int DEFAULT 0,                   -- 정리시간 (분)
  available_start_time time,                    -- 이용가능 시작시간
  available_end_time time,                      -- 이용가능 종료시간
  min_booking_notice int DEFAULT 0,             -- 최소 예약 가능 시간 (시간 단위)
  max_booking_days int DEFAULT 90,              -- 최대 예약 가능 일수
  instant_booking boolean DEFAULT false,        -- 즉시 예약 가능 여부
  rating_average numeric DEFAULT 0,             -- 평균 평점
  review_count int DEFAULT 0,                   -- 리뷰 수
  view_count int DEFAULT 0,                     -- 조회수
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 공간 이미지 테이블
CREATE TABLE space_images (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  space_id uuid REFERENCES spaces(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 운영 시간 테이블
CREATE TABLE operating_hours (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  space_id uuid REFERENCES spaces(id) ON DELETE CASCADE,
  day_of_week int NOT NULL, -- 0-6 (일-토)
  open_time time,
  close_time time,
  is_closed boolean DEFAULT false
);

-- 예약 테이블
CREATE TABLE bookings (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  space_id uuid REFERENCES spaces(id),
  user_id uuid REFERENCES users(id),
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone NOT NULL,
  total_price numeric NOT NULL,
  status text DEFAULT 'pending',                -- pending, confirmed, completed, cancelled
  guest_count int,
  special_requests text,
  host_message text,                           -- 호스트 메시지
  cancellation_reason text,                    -- 취소 사유
  cancelled_at timestamp with time zone,       -- 취소 시간
  cancelled_by uuid REFERENCES users(id),      -- 취소한 사용자
  refund_amount numeric,                       -- 환불 금액
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 리뷰 테이블
CREATE TABLE reviews (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  user_id uuid REFERENCES users(id),
  space_id uuid REFERENCES spaces(id),
  rating int CHECK (rating >= 1 AND rating <= 5),
  content text,
  images text[],
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 찜하기 테이블
CREATE TABLE favorites (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  space_id uuid REFERENCES spaces(id),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, space_id)
);

-- 결제 정보 테이블
CREATE TABLE payments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  amount numeric NOT NULL,
  payment_method text,
  payment_status text DEFAULT 'pending',
  transaction_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 공간 태그 테이블 추가
CREATE TABLE space_tags (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  space_id uuid REFERENCES spaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 공간 할인 정책 테이블 추가
CREATE TABLE space_discounts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  space_id uuid REFERENCES spaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  discount_type text NOT NULL,                 -- percentage, fixed
  discount_value numeric NOT NULL,
  min_hours int,                               -- 최소 시간
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 공간 문의 테이블 추가
CREATE TABLE space_inquiries (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  space_id uuid REFERENCES spaces(id),
  user_id uuid REFERENCES users(id),
  content text NOT NULL,
  is_private boolean DEFAULT false,
  parent_id uuid REFERENCES space_inquiries(id),  -- 답변을 위한 참조
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 알림 테이블 추가
CREATE TABLE notifications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  type text NOT NULL,                          -- booking_request, booking_confirmed, review 등
  title text NOT NULL,
  content text,
  is_read boolean DEFAULT false,
  related_id uuid,                             -- 관련 리소스 ID (예약 ID 등)
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 트리거 함수 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    full_name,
    avatar_url,
    metadata,
    provider
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data,
    NEW.raw_app_meta_data->>'provider'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = NEW.email,                              -- EXCLUDED 대신 NEW 사용
    full_name = NEW.raw_user_meta_data->>'full_name',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    metadata = NEW.raw_user_meta_data,
    provider = NEW.raw_app_meta_data->>'provider',
    updated_at = now();
  
  RETURN NEW;
END;
$$;

-- 트리거 생성
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
