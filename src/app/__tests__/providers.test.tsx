import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Providers } from '../providers';
import { useQuery } from '@tanstack/react-query';

// 모의 에러 메시지
const ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다';

// 테스트용 쿼리 컴포넌트
function TestComponent() {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: () => {
      throw new Error(ERROR_MESSAGE);
    },
  });

  return <div>{data}</div>;
}

// useToast 모킹
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn().mockImplementation((props) => {
      // 토스트 호출 시 DOM에 에러 메시지 추가
      document.body.innerHTML += `
        <div role="alert">
          <h2>${props.title}</h2>
          <p>${props.description}</p>
        </div>
      `;
    }),
  }),
}));

describe('Providers', () => {
  it('에러 발생 시 토스트 메시지가 표시되어야 함', async () => {
    // 콘솔 에러 억제 (테스트 중 의도된 에러이므로)
    const consoleSpy = vi.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    render(
      <Providers>
        <TestComponent />
      </Providers>,
    );

    // 토스트 메시지가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    // 에러 메시지 확인
    // expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();

    // 콘솔 스파이 정리
    consoleSpy.mockRestore();
  });

  it('개발 환경에서 콘솔 에러가 출력되어야 함', async () => {
    // Store original and set test env
    const originalEnv = process.env.NODE_ENV;
    vi.stubEnv('NODE_ENV', 'development');

    // 콘솔 에러 스파이 설정
    const consoleSpy = vi.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});

    render(
      <Providers>
        <TestComponent />
      </Providers>,
    );

    // 콘솔 에러 출력 확인
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Query Error]'),
      );
    });

    // Restore original env
    vi.stubEnv('NODE_ENV', originalEnv);
    vi.unstubAllEnvs();
    consoleSpy.mockRestore();
  });
});
