import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from 'next-intl/server';

const geist = Geist({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

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

  return (
    <html lang={locale} className={geist.className}>
      <body className="bg-slate-950 text-slate-100 antialiased">
        <NextIntlClientProvider locale={locale}>
          <Header />
            <main className="overflow-hidden">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}