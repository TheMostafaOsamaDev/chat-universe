import type { Metadata } from "next";
import { Poppins, Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers/providers";

const poppins_font = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  subsets: ["latin"],
});

const noto_serif_font = Noto_Serif({
  weight: ["400", "700"],
  preload: true,
  variable: "--noto-serif",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Chatty",
  description: "A chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins_font.className} ${noto_serif_font.variable} relative`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
