import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";

import { AuthProvider } from "@/providers/AuthProvider";
import ToastProvider from "@/components/ui/toast/ToastProvider";

import "./globals.css";

const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "4Ducks",
  description: "duckduckduckduck",
};

export const viewport: Viewport = {
  themeColor: "#f4f8fc",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} h-full antialiased`}
    >
      <body className="">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}