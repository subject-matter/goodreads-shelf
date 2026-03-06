import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageTransition from "./components/page-transition";

const monumentGrotesk = localFont({
  src: [
    {
      path: "./fonts/ABCMonumentGrotesk-Regular-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ABCMonumentGrotesk-Regular-Trial.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-monument",
});

export const metadata: Metadata = {
  title: "Rishi Samuel Patel",
  description: "Personal site of Rishi Samuel Patel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monumentGrotesk.className} antialiased`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
