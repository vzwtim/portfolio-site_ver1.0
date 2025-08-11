import React from "react";
import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
import "../globals.css";
import ClientLayout from "@/components/ClientLayout";

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

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
      <body 
        className={`${shipporiMincho.variable} font-sans`}
        style={{ fontFamily: "var(--font-shippori-mincho)" }}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
