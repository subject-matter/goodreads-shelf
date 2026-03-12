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
  title: "My Bookshelf",
  description: "Books I've been reading, powered by Goodreads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📖</text></svg>" />
      </head>
      <body className={`${monumentGrotesk.className} antialiased`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
