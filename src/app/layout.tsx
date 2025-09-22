import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Provider from "./_Components/Provider/Provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const caveat = Caveat({
    variable: "--font-caveat",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Halima Store",
    description:
        "E-commerce store built with Next.js 15, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body
                suppressHydrationWarning={true}
                className={`${caveat.variable} ${inter.variable} antialiased`}
            >
                <Provider>{children}</Provider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
