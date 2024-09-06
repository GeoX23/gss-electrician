import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GSS Electrician | Γιάννης Στεργιόπουλος",
  description:
    "Αναλαμβάνουμε την υλοποίηση παντός ηλεκτρολογικών εγκαταστάσεων, έκδοση πιστοποιητικών ΔΕΗ και ηλεκτρολογικών εργασιών.",
  verification: { google: "BpgWAFQ6S5TBfJ8nWa8pgScRxsv7bMm7M4CxS-TI0XA" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Navbar />
          <div>{children}</div>
          <Footer />
          <PopupWidget />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
