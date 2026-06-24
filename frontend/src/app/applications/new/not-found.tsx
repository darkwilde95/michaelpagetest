import Link from "next/link";

export default function ApplicationNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl rounded-2xl p-6 sm:p-8 text-center space-y-6 animate-fade-in">
        <div
          className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner"
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-gray-950 tracking-tight">
            No se encontró la solicitud
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
            El identificador de crédito no existe, fue digitado de forma errónea
            o expiró por políticas de seguridad de datos.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/50 text-left space-y-2.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-1">
            Opciones disponibles
          </span>

          <div className="flex flex-col gap-2">
            <Link
              href="/applications/new"
              className="flex items-center justify-between text-xs font-semibold text-gray-700 bg-white p-3 rounded-xl border border-gray-200 shadow-xs hover:border-blue-500 hover:text-blue-600 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span>Iniciar una nueva solicitud</span>
              <span
                className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <Link
              href="/applications"
              className="flex items-center justify-between text-xs font-semibold text-gray-700 bg-white p-3 rounded-xl border border-gray-200 shadow-xs hover:border-blue-500 hover:text-blue-600 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span>Volver al panel principal</span>
              <span
                className="text-gray-400 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Tag de Soporte Técnico */}
        <div className="pt-2">
          <p className="text-[10px] text-gray-400 font-medium">
            Código de referencia:{" "}
            <span className="font-mono bg-gray-100 px-1.5 py-0.5 border border-gray-200/40 rounded text-gray-600">
              ERR_CREDIT_ID_NOT_FOUND
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
