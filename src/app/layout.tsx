import React from "react";
import type { Metadata, Viewport } from "next";
import "../globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "ぼくは五目飯",
  description: "The portfolio of YUDAI, exploring the intersection of architecture and technology.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="ja">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
