import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Noto_Kufi_Arabic, Noto_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { siteConfig } from '@/lib/utils';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });
const arabicDisplay = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-arabic-display', display: 'swap', weight: ['500', '700'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('title'),
      template: '%s · Core',
    },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    keywords: [
      'human performance',
      'safety-critical',
      'consulting',
      'ISO 45001',
      'fatigue management',
      'rail operations',
      'UK',
      'Dubai',
      'Middle East',
    ],
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_GB',
      url: `${siteConfig.url}/${locale}`,
      title: t('title'),
      description: t('description'),
      siteName: 'Core',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${display.variable} ${mono.variable} ${arabic.variable} ${arabicDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg font-sans text-fg antialiased">
        <NextIntlClientProvider>
          <Providers>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[999] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-ink-950"
            >
              {t('skipToContent')}
            </a>
            <Navbar />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
            <CookieBanner />
            <CommandPalette />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Organization',
                  name: 'Core',
                  url: siteConfig.url,
                  description: siteConfig.description,
                  address: [
                    { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
                    { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
                  ],
                  sameAs: [siteConfig.linkedin],
                  logo: `${siteConfig.url}/logo.png`,
                  areaServed: ['United Kingdom', 'United Arab Emirates', 'Middle East'],
                  knowsAbout: [
                    'Human Performance',
                    'Safety-Critical Operations',
                    'Fatigue Risk Management',
                    'ISO 45001',
                  ],
                }),
              }}
            />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
