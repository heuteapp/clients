// app/fonts.ts
import localFont from "next/font/local";

export const helveticaNeue = localFont({
    src: [
        { path: "/fonts/HelveticaNeueCyr-Roman.woff2", weight: "400", style: "normal" },
        { path: "/fonts/HelveticaNeueCyr-Bold.woff2", weight: "700", style: "normal" },
    ],
    variable: "--font-helvetica-neue",
    display: "swap",
});