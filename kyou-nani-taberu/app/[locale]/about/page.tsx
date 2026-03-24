import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import StaticPageLayout from "@/components/StaticPageLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

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
        <h2 className="text-lg font-bold mt-6 mb-3" style={{ color: "var(--ink)" }}>
          {t("conceptTitle")}
        </h2>
        <p className="mb-4">{t("conceptText")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("featureTitle")}
        </h2>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>{t("feature1")}</li>
          <li>{t("feature2")}</li>
          <li>{t("feature3")}</li>
          <li>{t("feature4")}</li>
          <li>{t("feature5")}</li>
          <li>{t("feature6")}</li>
        </ul>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("visitorTitle")}
        </h2>
        <p className="mb-4">{t("visitorText")}</p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          {t("operatorTitle")}
        </h2>
        <p>{t("operator")}</p>
      </div>
    </StaticPageLayout>
  );
}
