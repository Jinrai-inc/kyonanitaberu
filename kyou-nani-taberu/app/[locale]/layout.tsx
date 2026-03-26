import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/config";
import AuthProvider from "@/components/AuthProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = "https://kyou-nani-taberu.app";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "ja" ? baseUrl : `${baseUrl}/${locale}`,
      languages: {
        ja: baseUrl,
        en: `${baseUrl}/en`,
        "zh-Hans": `${baseUrl}/zh-CN`,
        "zh-Hant": `${baseUrl}/zh-TW`,
        ko: `${baseUrl}/ko`,
        "x-default": baseUrl,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" href="/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-97V44W3CCT"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-97V44W3CCT');
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2054790971615092"
          crossOrigin="anonymous"
        />
        {process.env.NEXT_PUBLIC_APPLE_MAPKIT_TOKEN && (
          <script
            src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js"
            crossOrigin="anonymous"
            async
            data-callback="initMapKit"
            data-token={process.env.NEXT_PUBLIC_APPLE_MAPKIT_TOKEN}
          />
        )}
      </head>
      <body style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
