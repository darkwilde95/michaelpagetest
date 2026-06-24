import Link from "next/link";

export default function RootNotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gray-50/50 focus:outline-none"
    >
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-block" aria-hidden="true">
          <p className="text-8xl font-black text-gray-200 select-none tracking-tighter">
            404
          </p>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-600 uppercase tracking-widest mt-12">
            Página No Encontrada
          </span>
        </div>

        <div className="space-y-2 max-w-sm mx-auto">
          <h1 className="text-lg font-bold text-gray-900">
            La ruta solicitada no existe
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            Es posible que el enlace haya expirado, la solicitud cambiara de
            estado o la dirección se digitara incorrectamente.
          </p>
        </div>

        <nav
          aria-labelledby="nav-links-title"
          className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm space-y-2 text-left max-w-xs mx-auto"
        >
          <h2
            id="nav-links-title"
            className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1 px-1"
          >
            Enlaces Seguros
          </h2>
          <Link
            href="/applications/new"
            className="flex items-center justify-between text-xs font-semibold text-gray-700 p-2 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
          >
            <span>Iniciar Nueva Solicitud</span>
            <span aria-hidden="true" className="text-gray-400">
              →
            </span>
          </Link>
          <Link
            href="/applications"
            className="flex items-center justify-between text-xs font-semibold text-gray-700 p-2 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
          >
            <span>Mesa de Control / Listado</span>
            <span aria-hidden="true" className="text-gray-400">
              →
            </span>
          </Link>
        </nav>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-500 focus-visible:outline-offset-4 rounded"
          >
            <span aria-hidden="true">←</span> Regresar al Inicio General
          </Link>
        </div>
      </div>
    </main>
  );
}
