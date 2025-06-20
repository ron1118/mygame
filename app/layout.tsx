import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SearchProvider } from "./contexts/SearchContext";

export const metadata: Metadata = {
  title: "MyGame - VIP游戏厅",
  description: "高品质在线小游戏平台，畅玩动作、益智、体育、冒险等多种类型。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased">
        <LanguageProvider>
          <SearchProvider>
            <Navigation />
            
            {/* 页面内容 */}
            <main>
              {children}
            </main>
          </SearchProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
