-- 기존 테이블 및 타입 삭제
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS operating_hours CASCADE;
DROP TABLE IF EXISTS space_images CASCADE;
DROP TABLE IF EXISTS spaces CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- user_role enum 타입 생성
CREATE TYPE user_role AS ENUM ('guest', 'host', 'admin');

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create the auth.users table first
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text,
  CONSTRAINT users_email_key UNIQUE(email)
);

-- Then create the profiles table
CREATE TABLE profiles (
  id uuid references auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text unique,
  full_name text,
  phone_number text,
  avatar_url text,
  is_host boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 공간 카테고리 테이블
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  icon_url text
);

-- 공간 정보 테이블
create table spaces (
  id uuid default uuid_generate_v4() primary key,
  host_id uuid references profiles(id),
  category_id uuid references categories(id),
  name text not null,
  description text,
  address text not null,
  detailed_address text,
  latitude numeric,
  longitude numeric,
  max_capacity int,
  base_price numeric not null,
  minimum_hours int default 1,
  amenities jsonb,
  rules text[],
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 공간 이미지 테이블
create table space_images (
  id uuid default uuid_generate_v4() primary key,
  space_id uuid references spaces(id) on delete cascade,
  image_url text not null,
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 운영 시간 테이블
create table operating_hours (
  id uuid default uuid_generate_v4() primary key,
  space_id uuid references spaces(id) on delete cascade,
  day_of_week int not null, -- 0-6 (일-토)
  open_time time,
  close_time time,
  is_closed boolean default false
);

-- 예약 테이블
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  space_id uuid references spaces(id),
  user_id uuid references profiles(id),
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  total_price numeric not null,
  status text default 'pending',
  guest_count int,
  special_requests text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 리뷰 테이블
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id),
  user_id uuid references profiles(id),
  space_id uuid references spaces(id),
  rating int check (rating >= 1 and rating <= 5),
  content text,
  images text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 찜하기 테이블
create table favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  space_id uuid references spaces(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, space_id)
);

-- 결제 정보 테이블
create table payments (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id),
  amount numeric not null,
  payment_method text,
  payment_status text default 'pending',
  transaction_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS 정책 설정
alter table public.profiles enable row level security;

create policy "프로필은 누구나 볼 수 있음" on profiles
  for select using (true);

create policy "자신의 프로필만 수정 가능" on profiles
  for update using (auth.uid() = id);

-- 프로필 자동 생성을 위한 함수와 트리거
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();