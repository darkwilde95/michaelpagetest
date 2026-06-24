import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gray-50/50">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Código Estilizado */}
        <div className="relative inline-block">
          <h1 className="text-8xl font-black text-gray-200 select-none tracking-tighter">
            404
          </h1>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-600 uppercase tracking-widest mt-12">
            Página No Encontrada
          </span>
        </div>

        {/* Texto Informativo */}
        <div className="space-y-2 max-w-sm mx-auto">
          <h2 className="text-lg font-bold text-gray-900">
            La ruta solicitada no existe
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Es posible que el enlace haya expirado, la solicitud cambiara de
            estado o la dirección se digitara incorrectamente.
          </p>
        </div>

        {/* Menu de Navegación Alternativo */}
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm space-y-2 text-left max-w-xs mx-auto">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 px-1">
            Enlaces Seguros
          </span>
          <Link
            href="/applications/new"
            className="flex items-center justify-between text-xs font-semibold text-gray-700 p-2 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <span>Iniciar Nueva Solicitud</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link
            href="/applications"
            className="flex items-center justify-between text-xs font-semibold text-gray-700 p-2 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <span>Mesa de Control / Listado</span>
            <span className="text-gray-400">→</span>
          </Link>
        </div>

        {/* Botón de Retorno Inmediato */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors gap-1.5"
          >
            ← Regresar al Inicio General
          </Link>
        </div>
      </div>
    </div>
  );
}
