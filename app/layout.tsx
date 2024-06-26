import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Fellowship App",
  description: "The Life Fellowship App to stream, give, and connect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = "";

  return (
    <html lang="en">
      <body className={`${theme} ${inter.className} min-h-screen min-w-screen`}>{children}</body>
    </html>
  );
}

