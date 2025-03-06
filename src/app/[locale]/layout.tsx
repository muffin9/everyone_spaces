import type { Metadata } from 'next';
import '../globals.css';
import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '@/components/common/Header';

export const metadata: Metadata = {
  title: '모두의 공간',
  description: '모두의 공간',
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }, { locale: 'ja' }];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = await params.locale;
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
