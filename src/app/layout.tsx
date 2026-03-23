import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liga Osiedlowa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      {/* Czysty body - bez Sidebaru! */}
      <body className={`${inter.className} bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}