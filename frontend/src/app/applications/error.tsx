"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ErrorApplicationProps {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}

export default function ErrorApplication({
  error,
  reset,
}: ErrorApplicationProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("Application Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl rounded-2xl p-8 text-center space-y-6 animate-fade-in">
        <div
          className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner"
          aria-hidden="true"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-gray-950 tracking-tight">
            Ha ocurrido un inconveniente técnico
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            No pudimos procesar tu solicitud en este momento. Tu progreso está a
            salvo en nuestros sistemas de respaldo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            Reintentar Acción
          </button>
          <Link
            href="/applications"
            className="px-5 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors text-center"
          >
            Ir al Listado
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-100 text-left">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 hover:text-gray-600 focus:outline-none"
            aria-expanded={showDetails}
          >
            {showDetails ? "▼ Ocultar" : "▶ Mostrar"} detalles de soporte
          </button>

          {showDetails && (
            <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-200/60 font-mono text-[10px] text-gray-600 space-y-1.5 overflow-x-auto">
              <p>
                <span className="font-bold text-gray-400">Mensaje:</span>{" "}
                {error.message ||
                  "Error desconocido en el servidor de aplicaciones."}
              </p>
              {error.digest && (
                <p>
                  <span className="font-bold text-gray-400">
                    Hash de Rastreo (Digest):
                  </span>{" "}
                  {error.digest}
                </p>
              )}
              <p>
                <span className="font-bold text-gray-400">Timestamp:</span>{" "}
                {new Date().toISOString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
