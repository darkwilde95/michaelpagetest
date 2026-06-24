import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimiza la velocidad de renderizado de texto (evita FOIT)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// 1. Metadata Global unificada bajo la marca NexaCredit
export const metadata: Metadata = {
  title: {
    template: "%s | NexaCredit",
    default: "NexaCredit | Créditos Digitales al Instante",
  },
  description:
    "Simula y solicita tu crédito de libre destino 100% digital. Respuesta inmediata y desembolso seguro.",
  robots: "index, follow",
};

// 2. Viewport separado (Buenas prácticas actualizadas de Next.js)
export const viewport: Viewport = {
  themeColor: "#2563eb", // Azul corporativo base de la marca
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-white text-gray-900 flex flex-col font-sans selection:bg-blue-500/10 selection:text-blue-600">
        {children}
      </body>
    </html>
  );
}
