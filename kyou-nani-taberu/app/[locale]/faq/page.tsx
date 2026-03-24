import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import StaticPageLayout from "@/components/StaticPageLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title") };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  const questions = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
    { q: t("q8"), a: t("a8") },
  ];

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

      <p className="text-sm mb-6" style={{ color: "var(--ink2)" }}>
        {t("intro")}
      </p>

      <div className="text-sm leading-[1.9]" style={{ color: "var(--ink2)" }}>
        {questions.map((item, i) => (
          <div key={i} className="mb-6">
            <h2 className="text-base font-bold mb-2" style={{ color: "var(--ink)" }}>
              Q. {item.q}
            </h2>
            <p>A. {item.a}</p>
          </div>
        ))}
      </div>
    </StaticPageLayout>
  );
}
