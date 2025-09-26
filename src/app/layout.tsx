import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quentin Petiteville - Portfolio",
  description: "Personal portfolio showcasing my skills and experiences.",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-slate-950 text-slate-100">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
