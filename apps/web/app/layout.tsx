import { AppProviders } from "@/src/ui/providers/AppProviders";
import "@/src/ui/styles/shared/global.css";
import type { Metadata } from "next";
import { helveticaNeue } from "./fonts";

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
    <html lang="en" className={`${helveticaNeue.variable}`}>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}