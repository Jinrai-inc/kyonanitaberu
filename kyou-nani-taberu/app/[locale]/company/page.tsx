import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CompanyPage() {
  const t = useTranslations("app");

  const info = [
    { label: "会社名", value: "株式会社仁頼（じんらい）\nJinrai Co., Ltd." },
    { label: "設立", value: "2022年9月" },
    { label: "代表取締役", value: "齊藤 一樹（さいとう かずき）" },
    { label: "所在地", value: "〒221-0001\n神奈川県横浜市神奈川区西寺尾4丁目6番6-3号" },
    { label: "法人番号", value: "4020001148080" },
    { label: "事業内容", value: "GEO対策（AI検索最適化）/ SEO対策 / コンテンツマーケティング / インターネット広告運用 / SNS運用支援 / Webサイト制作 / 金融領域 監修・校閲 / AI導入支援 / DX支援" },
    { label: "URL", value: "https://jinrai.co.jp", isLink: true },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg)", fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-[700px] mx-auto px-5 py-10">
        <Link
          href="/"
          className="text-sm mb-6 inline-block"
          style={{ color: "var(--accent)" }}
        >
          ← {t("name")}
        </Link>

        <h1
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          運営会社
        </h1>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--card-solid)",
            border: "1px solid var(--border)",
          }}
        >
          {info.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col sm:flex-row"
              style={{
                borderBottom: i < info.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                className="text-sm font-bold px-5 py-4 sm:w-[140px] shrink-0"
                style={{ color: "var(--ink)", background: "rgba(0,0,0,0.02)" }}
              >
                {item.label}
              </div>
              <div
                className="text-sm px-5 py-4 whitespace-pre-line"
                style={{ color: "var(--ink2)" }}
              >
                {"isLink" in item && item.isLink ? (
                  <a
                    href={item.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
