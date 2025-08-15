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
      <body className="font-serif">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
