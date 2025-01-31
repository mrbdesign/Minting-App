import type { Metadata } from "next";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "sonner";
import { ToastProvider } from "@/components/ui/toast";
import { basePixelFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Glass Works",
  description: "SUZUKO",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={basePixelFont.className}>
        <ToastProvider>
          <Toaster position="bottom-center" />
          <ThirdwebProvider>{children}</ThirdwebProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
