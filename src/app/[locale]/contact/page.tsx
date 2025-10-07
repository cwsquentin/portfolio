import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactAnimations from "@/app/components/contact-animations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return {
    title: t('page.title'),
  };
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    email: "mailto:contact@quentinpetiteville.me",
    sameAs: [
      "https://github.com/cwsquentin",
      "https://www.linkedin.com/in/quentin-petiteville/"
    ]
  };

  return (
    <>
      <ContactAnimations />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
