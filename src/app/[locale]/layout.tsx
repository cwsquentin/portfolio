import "../globals.css";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

const geist = Geist({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Quentin Petiteville - Portfolio",
  description: "Personal portfolio showcasing my skills and experiences.",
};

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