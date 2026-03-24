import type { Metadata } from "next";
import StaticPageLayout from "@/components/StaticPageLayout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ja: "利用規約",
    en: "Terms of Service",
    "zh-CN": "使用条款",
    "zh-TW": "使用條款",
    ko: "이용약관",
  };
  return { title: titles[locale] || titles.ja };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <StaticPageLayout locale={locale}>
      <h1
        className="text-2xl font-bold mb-8"
        style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}
      >
        利用規約
      </h1>

      <div
        className="text-sm leading-[1.9]"
        style={{ color: "var(--ink2)" }}
      >
        <p className="mb-4">
          この利用規約（以下「本規約」）は、株式会社仁頼（以下「当社」）が提供するウェブサービス「今日何食べる？」（以下「本サービス」）の利用条件を定めるものです。ユーザーの皆様（以下「ユーザー」）には、本規約に同意いただいた上で、本サービスをご利用いただきます。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第1条（適用）
        </h2>
        <p className="mb-4">
          本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第2条（本サービスの内容）
        </h2>
        <p className="mb-4">
          本サービスは、ユーザーの現在地情報をもとに近隣の飲食店情報を検索・表示するサービスです。表示される店舗情報はGoogle Maps Platformを通じて取得したものであり、当社が内容の正確性、最新性、完全性を保証するものではありません。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第3条（利用登録）
        </h2>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>本サービスは、ゲストモードでの利用のほか、Google、Apple、LINEアカウントによるソーシャルログインを通じて利用登録を行うことができます。</li>
          <li>当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他、当社が利用登録を相当でないと判断した場合</li>
            </ul>
          </li>
        </ol>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第4条（禁止事項）
        </h2>
        <p className="mb-2">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
          <li>本サービスの運営を妨害するおそれのある行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>他のユーザーに成りすます行為</li>
          <li>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
          <li>当社、本サービスの他のユーザー、または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
          <li>本サービスで得た情報を商業目的で無断利用する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ol>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第5条（本サービスの提供の停止等）
        </h2>
        <p className="mb-4">
          当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
        </p>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
          <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
          <li>コンピュータまたは通信回線等が事故により停止した場合</li>
          <li>その他、当社が本サービスの提供が困難と判断した場合</li>
        </ol>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第6条（位置情報の利用）
        </h2>
        <p className="mb-4">
          本サービスは、ユーザーの端末の位置情報を利用して近隣の飲食店を検索します。位置情報の利用はユーザーの同意に基づくものであり、ブラウザの設定からいつでも無効にすることができます。取得した位置情報の取り扱いについては、当社のプライバシーポリシーに従います。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第7条（免責事項）
        </h2>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>当社は、本サービスに掲載される飲食店の情報（営業時間、定休日、価格帯、評価等）について、その正確性、完全性、有用性等に関していかなる保証も行いません。</li>
          <li>当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。</li>
          <li>当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。</li>
        </ol>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第8条（サービス内容の変更等）
        </h2>
        <p className="mb-4">
          当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第9条（利用規約の変更）
        </h2>
        <p className="mb-4">
          当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、本サービス上に掲示した時点から効力を生じるものとします。
        </p>

        <h2 className="text-lg font-bold mt-8 mb-3" style={{ color: "var(--ink)" }}>
          第10条（準拠法・裁判管轄）
        </h2>
        <p className="mb-4">
          本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、横浜地方裁判所を第一審の専属的合意管轄裁判所とします。
        </p>

        <div
          className="mt-10 pt-6 text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--ink4)" }}
        >
          <p>制定日：2026年3月23日</p>
          <p className="mt-1">株式会社仁頼</p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
