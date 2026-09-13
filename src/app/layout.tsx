import React from "react";
import type { Metadata, Viewport } from "next";
import "../globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.example.com"),
  title: { default: "YUDAI BABA｜不動産・事業企画・組織変革", template: "%s｜YUDAI BABA" },
  description: "空間・不動産・組織・地域を横断し、複雑な要素を実行可能な事業や体験へ編集する馬場雄大のポートフォリオ。",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "YUDAI BABA｜複雑さを、動くかたちに編集する。", description: "建築・不動産 × 事業企画 × 組織変革 × 個人の探究", type: "website", locale: "ja_JP" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="ja">
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
