import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import Footer from "@/components/footer";

const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Balint2201.dev",
  description: "Check out my cool site lol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientWrapper>
      <html lang="en">
        <body className={`${publicSans.variable} antialiased dark`}>
          {children}
          <Footer />
        </body>
      </html>
    </ClientWrapper>
  );
}
