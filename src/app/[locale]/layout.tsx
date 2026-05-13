import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Enable ISR - revalidate daily
export const revalidate = 86400;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  void locale; // locale preserved for future i18n expansion

  return {};
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure valid locale
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Enable static rendering for next-intl. Without this, getMessages() reads
  // from request context (cookies/headers) and forces the whole tree dynamic,
  // which is what makes /blog, /tutorials, /skills etc. show ƒ Dynamic in
  // the build output and hit origin on every request.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen flex flex-col bg-[#0B0F19]" lang={locale} data-locale={locale}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang="${locale}";`,
          }}
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
