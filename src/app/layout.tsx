import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, Noto_Sans_Mono } from "next/font/google";
import "@/app/globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

// 引入無斜線 0 的 Noto Sans Mono 等寬字體
const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "國小數學無限題庫",
  description: "基於 108 課綱指標設計，隨機產生基礎計算練習題",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${jakarta.variable} ${dmSans.variable} ${notoSansMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}