import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import { cn } from "@/lib/utils";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello Clone",
  description: "Trello Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(openSans.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
