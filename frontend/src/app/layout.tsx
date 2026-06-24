import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NexaCredit",
    default: "NexaCredit | Créditos Digitales al Instante",
  },
  description:
    "Simula y solicita tu crédito de libre destino 100% digital. Respuesta inmediata y desembolso seguro.",
  robots: { index: true, follow: true },
  applicationName: "NexaCredit",
  authors: [{ name: "NexaCredit Architecture Team" }],
  generator: "Next.js",
  keywords: [
    "crédito accesible",
    "financiamiento digital",
    "banca accesible",
    "solicitud de crédito",
  ],
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-gray-900 flex flex-col font-sans selection:bg-blue-500/10 selection:text-blue-600">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue-600 focus:text-white focus:text-xs focus:font-bold focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
