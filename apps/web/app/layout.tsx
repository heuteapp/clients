import { AppProviders } from "@/app/AppProviders";
import "@/src/ui-shared/styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className={`${inter.className}`}>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}