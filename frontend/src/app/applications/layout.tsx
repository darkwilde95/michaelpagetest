import { Metadata } from "next";
import Link from "next/link";

// Metadata profesional con la nueva identidad ficticia
export const metadata: Metadata = {
  title: "Portal de Originación | NexaCredit",
  description:
    "Plataforma digital para la simulación, radicación y auditoría de créditos de libre destino.",
};

export default function ApplicationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/60 text-gray-900 antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold z-50 shadow-md focus:outline-none"
      >
        Saltar al contenido principal
      </a>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-2 focus:outline-blue-500 focus:outline-offset-4 rounded-xl"
              aria-label="NexaCredit - Inicio de Mesa de Control"
            >
              <div className="w-9 w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <span className="text-lg font-black text-gray-950 tracking-tight group-hover:text-blue-600 transition-colors">
                Nexa<span className="text-blue-600 font-extrabold">Credit</span>
              </span>
            </Link>

            <span className="hidden sm:inline-block text-[10px] font-bold text-gray-400 bg-gray-100/80 border border-gray-200/50 px-2 py-0.5 rounded-md uppercase tracking-wider select-none">
              Mesa de Control
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200/60 px-2.5 py-1 rounded-full text-[10px] font-bold text-green-700 uppercase tracking-wide select-none"
              role="status"
              aria-label="Conexión cifrada y entorno financiero seguro"
            >
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Entorno Seguro</span>
            </div>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 focus:outline-none"
        tabIndex={-1}
      >
        {children}
      </main>

      <footer
        className="bg-white border-t border-gray-200/60 mt-auto py-6"
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-gray-400">
          <p>
            © 2026 NexaCredit S.A. Compañía de Financiamiento Comercial. Todos
            los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-gray-400 font-semibold">
            <span>Evaluación Técnica Frontend Experto</span>
            <span className="text-gray-200" aria-hidden="true">
              |
            </span>
            <span className="font-mono bg-gray-50 px-1.5 py-0.5 border border-gray-100 rounded text-gray-500">
              v1.0.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
