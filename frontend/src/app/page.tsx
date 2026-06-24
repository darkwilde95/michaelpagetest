import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Solicita tu crédito de libre destino 100% digital en minutos. Evaluación inmediata, segura y sin fricciones con NexaCredit.",
  alternates: {
    canonical: "/",
  },
};

export default function LandingPage() {
  async function handleSearchAction(formData: FormData) {
    "use server";

    const applicationId = formData.get("applicationId")?.toString().trim();

    if (applicationId) {
      redirect(`/applications/${applicationId}`);
    }
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="max-w-5xl mx-auto my-12 lg:my-20 space-y-16 px-4 animate-fade-in focus:outline-none"
    >
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 uppercase tracking-wider select-none">
          Plataforma de Originación Oficial
        </div>
        <h1 className="text-4xl font-black text-gray-950 tracking-tight sm:text-5xl leading-[1.1]">
          Financiamiento digital,{" "}
          <span className="text-blue-600">sin fricciones</span>.
        </h1>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
          Solicita tu crédito de libre destino de forma autónoma en minutos.
          Evaluamos tu viabilidad financiera con la seguridad y transparencia de{" "}
          <span className="text-gray-900 font-semibold">NexaCredit</span>.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-between space-y-8 transition-all hover:shadow-md hover:border-gray-300/80 group">
          <div className="space-y-4">
            <div
              className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-xs"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 group-hover:scale-105 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-950 tracking-tight">
                Nueva Solicitud
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Comienza tu proceso de evaluación. Registra tus datos básicos,
                ingresos y el monto requerido para obtener una oferta comercial
                adaptada a tu perfil de riesgo.
              </p>
            </div>
          </div>

          <Link
            href="/applications/new"
            className="w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 text-xs transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
          >
            Iniciar Proceso Digital
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-between space-y-8 transition-all hover:shadow-md hover:border-gray-300/80">
          <div className="space-y-4">
            <div
              className="w-11 h-11 bg-slate-50 text-slate-700 rounded-xl flex items-center justify-center shadow-xs"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-950 tracking-tight">
                Seguimiento de Solicitud
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                ¿Tienes un proceso en curso, un borrador guardado o un código de
                contingencia por soporte? Ingresa el identificador único para
                verificar su estado en tiempo real.
              </p>
            </div>
          </div>

          <form action={handleSearchAction} className="w-full space-y-2">
            <div className="flex gap-2">
              <label htmlFor="applicationId" className="sr-only">
                Identificador único de la solicitud (UUID)
              </label>
              <input
                type="text"
                id="applicationId"
                name="applicationId"
                required
                placeholder="Ingresa el UUID de la solicitud"
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 font-mono transition-all text-gray-800 placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gray-950 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-950 focus-visible:outline-offset-2 cursor-pointer"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-gray-50/80 rounded-2xl border border-gray-200/60 p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider">
            Mesa de Control y Auditoría
          </h3>
          <p className="text-[11px] text-gray-400 font-medium">
            Espacio exclusivo para asesores bancarios, analistas de riesgo y
            personal administrativo de NexaCredit.
          </p>
        </div>
        <Link
          href="/applications"
          className="px-4 py-2.5 border border-gray-200 text-gray-700 bg-white text-xs font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all shadow-xs whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-300"
        >
          Acceder como Administrador <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
