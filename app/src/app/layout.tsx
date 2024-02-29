import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import SideHeader from "@/components/SideHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes Share App",
  description: "Create your notes online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + ' flex gap-10 h-[100vh] w-full'}>


        <SideHeader />
        <main
          className="w-[70%]"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
