import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface StaticPageLayoutProps {
  locale: string;
  children: React.ReactNode;
}

export default async function StaticPageLayout({ locale, children }: StaticPageLayoutProps) {
  const t = await getTranslations({ locale, namespace: "app" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-[700px] mx-auto px-5 py-10">
        <Link
          href={locale === "ja" ? "/" : `/${locale}`}
          className="text-sm mb-6 inline-block no-underline"
          style={{ color: "var(--accent)" }}
        >
          &larr; {t("name")}
        </Link>

        {children}

        <footer
          className="mt-12 pt-6 text-center text-[10px]"
          style={{ borderTop: "1px solid var(--border)", color: "var(--ink4)" }}
        >
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href={locale === "ja" ? "/guide" : `/${locale}/guide`} className="underline" style={{ color: "var(--ink4)" }}>
              {tFooter("guide")}
            </Link>
            <Link href={locale === "ja" ? "/faq" : `/${locale}/faq`} className="underline" style={{ color: "var(--ink4)" }}>
              {tFooter("faq")}
            </Link>
            <Link href={locale === "ja" ? "/about" : `/${locale}/about`} className="underline" style={{ color: "var(--ink4)" }}>
              {tFooter("about")}
            </Link>
            <Link href={locale === "ja" ? "/privacy" : `/${locale}/privacy`} className="underline" style={{ color: "var(--ink4)" }}>
              {tFooter("privacy")}
            </Link>
            <Link href={locale === "ja" ? "/terms" : `/${locale}/terms`} className="underline" style={{ color: "var(--ink4)" }}>
              {tFooter("terms")}
            </Link>
          </div>
          <p className="mt-3">&copy; 2025 株式会社仁頼</p>
        </footer>
      </div>
    </div>
  );
}
