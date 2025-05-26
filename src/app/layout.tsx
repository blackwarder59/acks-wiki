import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { SearchProvider } from "@/lib/search/search-context";
import { TooltipProvider } from "@/components/ui/tooltip-provider";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "ACKS II Wiki",
    template: "%s | ACKS II Wiki"
  },
  description: "A comprehensive, searchable wiki for the Adventurer Conqueror King System II (ACKS II) tabletop RPG. Find monsters, spells, classes, equipment, and rules.",
  keywords: ["ACKS II", "Adventurer Conqueror King", "tabletop RPG", "monsters", "spells", "classes", "D&D", "fantasy"],
  authors: [{ name: "ACKS II Community" }],
  creator: "ACKS II Community",
  publisher: "ACKS II Community",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://acks-wiki.vercel.app",
    title: "ACKS II Wiki",
    description: "A comprehensive, searchable wiki for the Adventurer Conqueror King System II (ACKS II) tabletop RPG.",
    siteName: "ACKS II Wiki",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACKS II Wiki",
    description: "A comprehensive, searchable wiki for the Adventurer Conqueror King System II (ACKS II) tabletop RPG.",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="acks-wiki-theme"
        >
          <SearchProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-background">
                <Header />
                <div className="flex">
                  <Sidebar className="hidden lg:block" />
                  <main className="flex-1 p-6">
                    {children}
                  </main>
                </div>
              </div>
            </TooltipProvider>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
