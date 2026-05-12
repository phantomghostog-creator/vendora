import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VENDORA | Build Your Online Store for $15/mo",
  description: "Start selling online with VENDORA - the affordable e-commerce platform. 5 products, 2.7% fees, instant Capitec payouts. No monthly limits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
