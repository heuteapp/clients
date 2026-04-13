import { AppProviders } from "@/app/AppProviders";
import "@/src/modules/ui-shared/styles/global.css";
import "@/src/modules/ui-shared/styles/styled-card.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'HeuteApp',
  description: 'Daily what you learned, Yours to keep.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HeuteApp',
  },
  icons: {
    apple: '/icons/apple-icon-180.png',
    icon: [
      { url: '/icons/manifest-icon-192.maskable.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/manifest-icon-512.maskable.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}