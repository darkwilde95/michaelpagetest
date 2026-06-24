import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationService } from "@/core/applications/service";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

// 🎯 Criterio 1: Inyección de metadatos dinámicos para SEO y control de pestañas
export async function generateMetadata({
  params,
}: SuccessPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Solicitud Confirmada (${id.slice(0, 8)}) | NexaCredit`,
    description:
      "La solicitud de crédito digital ha sido procesada e ingresada al sistema con éxito.",
  };
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;
  const application = await ApplicationService.findOne(id);

  return (
    <div className="max-w-xl mx-auto my-6 sm:my-16 p-5 sm:p-8 bg-white shadow-xl rounded-2xl border border-gray-100 text-center space-y-6 animate-fade-in">
      <div
        className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner font-bold"
        aria-hidden="true"
      >
        ✓
      </div>

      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">
          ¡Crédito Confirmado Exitosamente!
        </h1>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          {application?.fullName ? `${application.fullName}, tu` : "Tu"}{" "}
          solicitud de originación digital ha sido procesada con éxito en los
          sistemas centrales.
        </p>
      </div>

      <div className="p-5 bg-gray-50 rounded-xl border border-gray-200/60 text-left space-y-3">
        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-0.5">
          Detalles del Registro
        </h2>

        <dl className="text-xs text-gray-600 space-y-2.5 font-mono">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4 border-b border-gray-200/40 pb-2">
            <dt className="font-bold text-gray-500 font-sans">
              ID de Operación:
            </dt>
            <dd className="text-gray-950 select-all font-semibold break-all">
              {id}
            </dd>
          </div>

          {application?.requestedAmount && (
            <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4 border-b border-gray-200/40 pb-2">
              <dt className="font-bold text-gray-500 font-sans">
                Monto Final:
              </dt>
              <dd className="text-gray-950 font-semibold">
                ${application.requestedAmount.toLocaleString("es-CO")}
              </dd>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4 pt-0.5">
            <dt className="font-bold text-gray-500 font-sans">
              Canal de Registro:
            </dt>
            <dd className="text-gray-950 font-semibold capitalize">
              {application?.channel ?? "Digital"}
            </dd>
          </div>
        </dl>
      </div>

      <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs mx-auto font-medium">
        Un asesor se pondrá en contacto en las próximas horas si se requiere
        validación documental física.
      </p>

      <div className="pt-2">
        <Link
          href="/"
          className="block w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 text-xs transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Regresar al Inicio
        </Link>
      </div>
    </div>
  );
}
