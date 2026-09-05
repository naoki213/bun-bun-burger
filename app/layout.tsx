import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BUN BUN BURGER｜腹いっぱいって、しあわせだ。',
  description:
    '大阪の街の架空のクラフトバーガーショップ。100%ビーフ、焼きたてバンズ、野菜たっぷり。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
