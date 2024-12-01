import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Providers from "@/components/providers/providers";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import GlobalError from "./global-error";
export const metadata: Metadata = {
  title: "Chat Universe",
  description: "Start chatting with people around the world.",
};

const PoppinsFont = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ErrorBoundary errorComponent={GlobalError}>
        <body className={`${PoppinsFont.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </ErrorBoundary>
    </html>
  );
}
