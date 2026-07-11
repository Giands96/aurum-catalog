import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { Navbar } from "@/components/aura/Navbar";
import { Footer } from "@/components/aura/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "AURUM — Perfumería & Relojería",
  description:
    "AURUM. Boutique premium de fragancias y relojería de autor. Piezas seleccionadas, empaque premium y envío gratis desde S/. 150.",
  openGraph: {
    title: "AURUM — Perfumería & Relojería de autor",
    description: "Fragancias y relojería de autor. Selección editorial premium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${unbounded.variable}`}>
      <body className="min-h-screen bg-background text-text-primary font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
