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
  title: "Etrenzik LLC v. Inergy Solutions, LLC — Litigation Case Workspace",
  description:
    "Private litigation workspace for Etrenzik LLC v. Inergy Solutions, LLC. Evidence management, timeline reconstruction, invoice reconciliation, and complaint drafting.",
  openGraph: {
    title: "Etrenzik LLC v. Inergy Solutions — Case Workspace",
    description: "Private litigation workspace — draft work product, not legal advice.",
    url: "https://case.etrenzik.com",
    siteName: "Etrenzik Case Portal",
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
