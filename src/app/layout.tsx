/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import type { Metadata } from "next";
import "../globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "YUDAI | Architectural Designer & Software Engineer",
  description: "The portfolio of YUDAI, exploring the intersection of architecture and technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
