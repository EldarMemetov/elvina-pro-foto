import '../globals.scss';

import initTranslations from '@/i18n/utils/i18n';
import TranslationsProvider from '@/i18n/utils/TranslationsProvider';
import ErrorBoundaryWithTranslation from '@/shared/components/ErrorBoundary/ErrorBoundaryWithTranslation/ErrorBoundaryWithTranslation';

import { NAMESPACES } from '@/shared/constants';
import { SITE_URL, SITE_NAME } from '@/shared/constants/site';
import i18nConfig from '../../../i18nConfig';
import { dir } from 'i18next';
import SvgSpriteLoader from '@/shared/constants/SvgSpriteLoader/SvgSpriteLoader';
import {
  Manrope,
  Playfair_Display,
  Cormorant_Garamond,
} from 'next/font/google';
import clsx from 'clsx';
import Header from '@/modules/Header/Header';
import Footer from '@/modules/Footer/Footer';

// Manrope — текст, меню, кнопки, интерфейс
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

// Playfair Display — заголовки
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
});

// Cormorant Garamond — изысканные курсивные акценты
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#39332d',
};

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params);

  const indexable = locale === 'ru';

  const title = 'Фотограф в Лимассоле, Кипр — свадьбы, семьи, портреты';
  const description =
    'Профессиональный фотограф в Лимассоле, 15+ лет опыта. Свадебная, семейная и портретная съёмка, Love Story по всему Кипру. Запишитесь на съёмку.';
  const ogImage = '/image/hero-2.jpg';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    alternates: { canonical: `/${locale}` },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: `/${locale}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default async function Layout({ children, params }) {
  const { locale } = await Promise.resolve(params);

  const langMap = { en: 'en', ru: 'ru' };
  const htmlLang = langMap[locale] || 'ru';

  const { resources } = await initTranslations(locale, NAMESPACES);

  return (
    <html lang={htmlLang} dir={dir(locale)}>
      <body
        suppressHydrationWarning={true}
        className={clsx(
          manrope.variable,
          playfair.variable,
          cormorant.variable
        )}
      >
        <SvgSpriteLoader />

        <TranslationsProvider
          namespaces={NAMESPACES}
          locale={locale}
          resources={resources}
        >
          <ErrorBoundaryWithTranslation>
            <Header />
            <main>{children}</main>
            <Footer />
          </ErrorBoundaryWithTranslation>
        </TranslationsProvider>
      </body>
    </html>
  );
}
