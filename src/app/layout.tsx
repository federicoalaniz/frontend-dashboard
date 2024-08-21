'use client'
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { createTimeCheck } from "@/utils/basics";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
