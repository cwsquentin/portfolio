import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('common.error404');

  return (
    <div className="pt-25 pb-95 min-h-125 flex flex-col items-center justify-center bg-black">
      <h1 className="lg:text-[15.563rem] md:text-[12.5rem] text-[8.625rem] font-bold text-white">404</h1>
      <p className="text-2xl font-medium -mt-10 text-white">{t('notfound')}</p>
    </div>
  );
}