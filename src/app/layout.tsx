import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mukharomdev",
  description: "Mini blog seputar pengalaman pribadi dunia pemrograman komputer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `} 
      >
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        {children}
        </div>
        </div>
      </body>
    </html>
  );
}
