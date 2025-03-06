import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    locale, // locale을 반환해야 합니다
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
