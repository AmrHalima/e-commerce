import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "./_Components/Navbar/Navbar";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/ui/footer";
import { Toaster } from "sonner";
import CartContextProvider from "@/context/CartContext";

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
                <CartContextProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <Navbar />
                        <Toaster position="bottom-right" theme="system" />
                        <div className="mt-24">{children}</div>
                        <Footer />
                    </ThemeProvider>
                </CartContextProvider>
            </body>
        </html>
    );
}
