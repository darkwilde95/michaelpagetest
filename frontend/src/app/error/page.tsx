"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message =
    searchParams.get("message") ||
    "No pudimos procesar la solicitud en nuestros sistemas transaccionales.";
  const code = searchParams.get("code") || "ERR_INTERNAL_BFF_500";

  useEffect(() => {
    document.title = "Error en el Sistema | NexaCredit";
  }, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="max-w-md mx-auto my-12 p-8 bg-white border border-gray-200/80 shadow-xl rounded-2xl text-center space-y-6 animate-fade-in focus:outline-none"
    >
      <div
        className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner"
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-lg font-black text-gray-950 tracking-tight">
          Sistema Temporadamente No Disponible
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto font-medium">
          {message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => router.back()}
          className="w-full sm:w-1/2 order-2 sm:order-1 px-4 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-xs cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
        >
          Reintentar Operación
        </button>
        <button
          onClick={() => router.push("/applications")}
          className="w-full sm:w-1/2 order-1 sm:order-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-300 focus-visible:outline-offset-2"
        >
          Ir al Panel Principal
        </button>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-[9px] font-mono text-gray-400">
          Código de Auditoría:{" "}
          <span className="bg-gray-50 px-1.5 py-0.5 border border-gray-200/50 rounded font-bold text-gray-500">
            {code}
          </span>
        </p>
      </div>
    </main>
  );
}

export default function GlobalApplicationErrorPage() {
  return (
    <Suspense
      fallback={
        <div
          className="text-center text-xs text-gray-400 font-medium py-12"
          role="status"
          aria-live="polite"
        >
          Cargando trazabilidad del incidente...
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
