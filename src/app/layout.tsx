import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mukharomdev",
  description: "Blog tentang pengalaman pribadi dalam dunia pemrograman",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" html suppressHydrationWarning>
      <head>
      <ThemeModeScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

