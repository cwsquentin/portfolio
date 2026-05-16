import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Motion from "@/app/components/motion";
import { Big_Shoulders, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';


const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-big-shoulders",
  display: "swap",
  adjustFontFallback: false,
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({params}: {params: Promise<{ locale: string }>;}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: {
      template: "Quentin Petiteville - %s",
      default: "Quentin Petiteville",
    },
    description: t('page.defaultDescription'),
    icons: { icon: '/favicon.ico' },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc}`]),
      ),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${bigShoulders.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">
        <NextIntlClientProvider locale={locale}>
          <Motion>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 overflow-hidden">{children}</main>
              <Footer />
            </div>
          </Motion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}