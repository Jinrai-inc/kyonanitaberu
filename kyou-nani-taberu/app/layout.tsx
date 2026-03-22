import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "今日何食べる？ - What do you want to eat today",
  description: "現在地から近くのお店をサクッと探して、迷ったらルーレットでおまかせ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&family=M+PLUS+Rounded+1c:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
