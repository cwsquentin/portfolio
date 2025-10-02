import { notFound } from 'next/navigation';

import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common.error404' });

  return {
    title: t('notfound'),
  };
}


export default function CatchAllPage() {
  notFound();
}