import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import StaticPageLayout from "@/components/StaticPageLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  return { title: t("title") };
}

export default async function GuidePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });

  return (
    <StaticPageLayout locale={locale}>
      <h1
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}
      >
        {t("title")}
      </h1>
      <p className="text-[11px] mb-8" style={{ color: "var(--ink4)" }}>
        {t("updated")}
      </p>

      <div className="text-sm leading-[1.9]" style={{ color: "var(--ink2)" }}>
        <p className="mb-6 text-base font-bold" style={{ color: "var(--ink)" }}>
          {t("intro")}
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("step1title")}
        </h2>
        <p className="mb-4">{t("step1text")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("step2title")}
        </h2>
        <p className="mb-4">{t("step2text")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("step3title")}
        </h2>
        <p className="mb-4">{t("step3text")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("step4title")}
        </h2>
        <p className="mb-4">{t("step4text")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("rouletteTitle")}
        </h2>
        <p className="mb-4">{t("rouletteText")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("langTitle")}
        </h2>
        <p className="mb-4">{t("langText")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("featureTitle")}
        </h2>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>{t("feature1")}</li>
          <li>{t("feature2")}</li>
          <li>{t("feature3")}</li>
        </ul>
      </div>
    </StaticPageLayout>
  );
}
