import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.jinrai.kyounanitaberu",
  appName: "今日何食べる",
  webDir: "out",
  server: {
    // リモートURL読み込み: デプロイ済みのURLに変更してください
    url: "https://kyou-nani-taberu.vercel.app",
    cleartext: false,
  },
};

export default config;
