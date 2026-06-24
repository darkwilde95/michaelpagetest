import Link from "next/link";
import { redirect } from "next/navigation";

export default function LandingPage() {
  // Server Action inline para procesar la búsqueda del ID de seguimiento
  async function handleSearchAction(formData: FormData) {
    "use server";

    const applicationId = formData.get("applicationId")?.toString().trim();

    if (applicationId) {
      // Redirige directamente al detalle de la solicitud (Mesa de control/Línea de tiempo)
      redirect(`/applications/${applicationId}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-16 space-y-12 px-4">
      {/* Sección Hero / Encabezado */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-gray-950 tracking-tight sm:text-5xl">
          Originación Digital de Crédito
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
          Solicita tu crédito de libre destino de forma autónoma o asistida en
          minutos. Evaluamos tu viabilidad financiera con total seguridad y
          transparencia.
        </p>
      </div>

      {/* Grid de Acciones Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta A: Iniciar Flujo */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6 transition-all hover:shadow-md">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold">
              🚀
            </div>
            <h2 className="text-xl font-bold text-gray-900">Nueva Solicitud</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Comienza tu proceso de evaluación. Registra tus datos básicos,
              ingresos y el monto requerido para obtener una oferta comercial
              adaptada a tu perfil.
            </p>
          </div>

          <Link
            href="/applications/new"
            className="w-full text-center py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 text-sm transition-colors shadow-sm block"
          >
            Iniciar Proceso Digital
          </Link>
        </div>

        {/* Tarjeta B: Consultar o Retomar Solicitud (Uso de Server Action) */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-6 transition-all hover:shadow-md">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold">
              🔍
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Seguimiento de Solicitud
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              ¿Tienes un proceso en curso, un borrador guardado o un código de
              contingencia por soporte? Ingresa el identificador para verificar
              su estado actual.
            </p>
          </div>

          {/* Formulario Nativo que invoca la Server Action directamente en el servidor */}
          <form action={handleSearchAction} className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                name="applicationId"
                required
                placeholder="Ingresa el UUID de la solicitud"
                className="flex-1 p-2.5 border border-gray-300 rounded-xl text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gray-950 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sección Inferior / Acceso Administrativo Neutro */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Mesa de Control y Auditoría
          </h3>
          <p className="text-[11px] text-gray-400">
            Espacio exclusivo para asesores, analistas de riesgo y personal
            administrativo del banco.
          </p>
        </div>
        <Link
          href="/applications"
          className="px-4 py-2 border border-gray-300 text-gray-700 bg-white text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Acceder como Administrador →
        </Link>
      </div>
    </div>
  );
}
