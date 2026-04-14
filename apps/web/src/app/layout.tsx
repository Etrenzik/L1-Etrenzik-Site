import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Etrenzik L1 — Learn to Build on the Etrenzik Blockchain",
  description:
    "Educational hub for the Etrenzik sovereign Layer 1 blockchain. Learn about Cosmos SDK, CosmWasm smart contracts, AI orchestration, namespaces, NFTs, stablecoins, and more.",
  openGraph: {
    title: "Etrenzik L1 — Learn to Build",
    description: "Educational hub for the Etrenzik sovereign Layer 1 blockchain.",
    url: "https://l1.etrenzik.com",
    siteName: "Etrenzik L1",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
