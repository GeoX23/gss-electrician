import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GSS Electrician | Γιάννης Στεργιόπουλος",
  description:
    "Αναλαμβάνουμε την υλοποίηση παντός ηλεκτρολογικών εγκαταστάσεων, έκδοση πιστοποιητικών ΔΕΗ και διάφορα ηλεκτρολογικές εργασίες.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Navbar />
          <div>{children}</div>
          <Footer />
          <PopupWidget />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
