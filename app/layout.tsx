import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer, Navbar } from "@/components";
import { getBrand } from "@/lib/actions/content.actions";
import { Brand } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const brand: Brand = await getBrand();

  return {
    title: brand.name,
    description: brand.brand.shortDescription,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col items-center justify-between text-primary-black ${inter.className}`}
      >
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
