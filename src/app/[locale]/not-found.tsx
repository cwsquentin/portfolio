import { useTranslations } from "next-intl";
import { Display } from "@/app/components/primitives/display";

export default function NotFound() {
  const t = useTranslations("common.error404");

  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center bg-paper px-6 py-24 text-center text-ink">
      <Display size="hero" as="h1" weight={800} className="text-magenta">
        404
      </Display>
      <p className="mt-6 max-w-md font-body text-lg text-ink/80">{t("notfound")}</p>
    </div>
  );
}
