import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";

const kanit = Kanit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Family Health Companion",
  description: "บันทึกและดูแลข้อมูลสุขภาพของคนในครอบครัว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${kanit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
