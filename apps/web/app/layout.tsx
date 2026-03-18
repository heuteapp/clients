import { Providers } from "@/src/ui/components/Providers";
import { StickyNavbar } from "@/src/ui/components/StickyNavbar";
import "@/src/ui/styles/shared/global.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeuteApp",
  description: "Daily learning journey",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <StickyNavbar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}