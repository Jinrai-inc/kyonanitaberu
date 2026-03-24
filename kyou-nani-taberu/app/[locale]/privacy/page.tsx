import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import StaticPageLayout from "@/components/StaticPageLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ja: "プライバシーポリシー",
    en: "Privacy Policy",
    "zh-CN": "隐私政策",
    "zh-TW": "隱私政策",
    ko: "개인정보 처리방침",
  };
  return { title: titles[locale] || titles.ja };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "app" });

  // Use Japanese content by default, with English fallback
  if (locale === "en") {
    return (
      <StaticPageLayout locale={locale}>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>
          Privacy Policy
        </h1>
        <p className="text-[11px] mb-8" style={{ color: "var(--ink4)" }}>Last updated: March 2026</p>

        <div className="text-sm leading-[1.9]" style={{ color: "var(--ink2)" }}>
          <p className="mb-4">
            Jinrai Co., Ltd. (hereinafter &quot;we&quot; or &quot;the Company&quot;) establishes this Privacy Policy regarding the handling of personal information in our web service &quot;What to Eat Today?&quot; (hereinafter &quot;the Service&quot;).
          </p>

          <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>1. Use of Google AdSense</h2>
          <p className="mb-4">
            This website uses Google AdSense, a third-party advertising service. The advertising provider may use cookies to display ads based on your interests. Google&apos;s use of advertising cookies enables Google and its partners to serve appropriate ads based on your visits to this and other websites.
          </p>

          <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>2. About Cookies</h2>
          <p className="mb-4">
            Cookies are used for the following purposes: delivering personalized ads, understanding website usage, and improving service quality. You can disable personalized ads in Google&apos;s ad settings at <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>https://adssettings.google.com/</a>.
          </p>

          <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>3. Location Information</h2>
          <p className="mb-4">
            This app acquires location information with user permission, solely for the purpose of searching nearby restaurants. Location information is not stored on our servers and is used only for real-time search queries.
          </p>

          <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>4. Use of Google Maps Platform</h2>
          <p className="mb-4">
            This app uses Google Maps Platform to display restaurant information. The use of location data through Google Maps Platform is subject to the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>Google Privacy Policy</a>.
          </p>

          <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>5. Third-Party Advertising</h2>
          <p className="mb-4">
            In addition to Google, third-party ad networks (such as Ninja AdMax) may use cookies to serve ads on this website.
          </p>

          <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>6. Affiliate Links</h2>
          <p className="mb-4">
            Some links on this website contain affiliate advertising. The website operator may receive compensation when products are purchased or services are used through these links.
          </p>

          <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>7. Analytics</h2>
          <p className="mb-4">
            We may use analytics tools to understand how users interact with the Service. This data is used solely for improving the user experience and is processed in an anonymized form.
          </p>

          <div className="mt-10 pt-6 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--ink4)" }}>
            <p>Established: March 23, 2026</p>
            <p className="mt-1">Jinrai Co., Ltd.</p>
          </div>
        </div>
      </StaticPageLayout>
    );
  }

  // Japanese (default for all other locales)
  return (
    <StaticPageLayout locale={locale}>
      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>
        プライバシーポリシー
      </h1>
      <p className="text-[11px] mb-8" style={{ color: "var(--ink4)" }}>最終更新：2026年3月</p>

      <div className="text-sm leading-[1.9]" style={{ color: "var(--ink2)" }}>
        <p className="mb-4">
          株式会社仁頼（以下「当社」）は、当社が提供するウェブサービス「今日何食べる？」（以下「本サービス」）における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          1. Google AdSense の利用について
        </h2>
        <p className="mb-4">
          当サイトは、第三者配信の広告サービス（Google AdSense）を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するために、Cookie を使用することがあります。Google が広告 Cookie を使用することにより、ユーザーがそのサイトや他のサイトにアクセスした際の情報に基づいて、Google やそのパートナーが適切な広告をユーザーに表示できます。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          2. Cookie の使用について
        </h2>
        <p className="mb-4">
          Cookie は、広告のパーソナライズ、ウェブサイトの利用状況の把握、サービス品質の向上を目的として使用されます。ユーザーは、Google の広告設定ページ（<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>https://adssettings.google.com/</a>）で、パーソナライズ広告を無効にすることができます。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          3. 位置情報の取得について
        </h2>
        <p className="mb-4">
          当アプリは、ユーザーの許可のもと位置情報を取得し、周辺の飲食店を検索する目的でのみ使用します。位置情報はサーバーに保存されず、リアルタイムの検索クエリにのみ使用されます。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          4. Google Maps Platform の利用について
        </h2>
        <p className="mb-4">
          当アプリは、店舗情報の表示に Google Maps Platform を利用しています。Google Maps Platform を通じた位置情報の利用は、<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>Googleプライバシーポリシー</a>に準拠します。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          5. 第三者広告ネットワークについて
        </h2>
        <p className="mb-4">
          当サイトでは、Google 以外の第三者広告配信事業者（忍者AdMax等）が Cookie を使用して広告を配信する場合があります。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          6. アフィリエイトリンクについて
        </h2>
        <p className="mb-4">
          当サイトの一部のリンクにはアフィリエイト広告が含まれています。リンク先での商品購入やサービス利用により、当サイト運営者が報酬を受け取る場合があります。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          7. アクセス解析について
        </h2>
        <p className="mb-4">
          当サイトでは、ユーザーの利用状況を把握するためにアクセス解析ツールを使用する場合があります。これらのデータはユーザー体験の向上を目的としてのみ使用され、匿名化された形で処理されます。
        </p>

        <div className="mt-10 pt-6 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--ink4)" }}>
          <p>制定日：2026年3月23日</p>
          <p className="mt-1">株式会社仁頼</p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
