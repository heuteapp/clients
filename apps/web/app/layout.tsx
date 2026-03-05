import Monitor from "@/src/components/layout/Monitor";
import Sidebar from "@/src/components/layout/Sidebar";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Sidebar />
        <Monitor>
          {children}
        </Monitor>
      </body>
    </html>
  );
}
