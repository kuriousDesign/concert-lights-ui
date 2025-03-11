import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocketProvider from "@contexts/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SocketProvider> {/* Wrap your app with the provider */}
          <nav>
            <div className="sticky top-0 left-0 z-100 bg-gray-900 text-white p-2 ">
              <h1 className="text-center">Conor Byrne</h1>
            </div>
            <div className="px-3 pt-4">{children}</div>
          </nav>
        </SocketProvider>
      </body>
    </html>
  );
}
