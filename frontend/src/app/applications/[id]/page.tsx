import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicationService } from "@/core/applications/service";
import {
  ApplicationStatus,
  IApplication,
  IApplicationEvent,
} from "@/core/applications/types";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const application = await ApplicationService.findOne(id);
    if (!application) return { title: "Solicitud no encontrada | NexaCredit" };
    return {
      title: `Detalle de Solicitud - ${application.fullName || "Cliente"} | NexaCredit`,
      description: `Historial de auditoría, trazabilidad de estados y perfil financiero de la solicitud de crédito con ID ${id}.`,
    };
  } catch {
    return { title: "Expediente de Crédito | NexaCredit" };
  }
}

export default async function ApplicationDetailPage({
  params,
}: DetailPageProps) {
  const { id } = await params;

  let application: IApplication | null = null;
  let timeline: IApplicationEvent[] = [];

  [application, timeline] = await Promise.all([
    ApplicationService.findOne(id),
    ApplicationService.getEvents(id),
  ]);

  return (
    <div className="max-w-5xl mx-auto my-4 sm:my-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
      <div className="md:col-span-2 space-y-6">
        <section
          className="bg-white p-4 sm:p-6 shadow-sm rounded-xl border border-gray-100 space-y-4"
          aria-labelledby="main-heading"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <Link
                href="/applications"
                className="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
              >
                <span aria-hidden="true">←</span> Volver al Listado
              </Link>
              <h1
                id="main-heading"
                className="text-xl font-bold text-gray-800 mt-1"
              >
                {application.fullName || "Cliente Sin Nombre"}
              </h1>
              <p className="text-[11px] text-gray-400 font-mono">
                ID: {application.id}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
              <span
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full"
                role="status"
              >
                {application.status}
              </span>

              {application.advisorId && (
                <span
                  className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold rounded-md uppercase tracking-wide"
                  role="status"
                  aria-label={`Proceso asistido por asesor código ${application.advisorId}`}
                >
                  Asistido • ID: {application.advisorId}
                </span>
              )}

              {(application.status === ApplicationStatus.VIABLE ||
                application.status === ApplicationStatus.DRAFT) && (
                <Link
                  href={`/applications/new?id=${application.id}`}
                  className="text-xs text-blue-600 font-semibold hover:underline mt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
                >
                  Retomar Proceso
                </Link>
              )}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-3">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Datos Básicos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block sm:inline">
                  Documento:
                </span>{" "}
                <span className="font-semibold text-gray-700 break-all">
                  {application.documentType} - {application.documentNumber}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block sm:inline">Ciudad:</span>{" "}
                <span className="font-semibold text-gray-700">
                  {application.city || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block sm:inline">Celular:</span>{" "}
                <span className="font-semibold text-gray-700">
                  {application.phoneNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block sm:inline">Correo:</span>{" "}
                <span className="font-semibold text-gray-700 break-all">
                  {application.email || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-3">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Perfil Financiero y Solicitud
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block sm:inline">
                  Ingresos Declarados:
                </span>{" "}
                <span className="font-semibold text-gray-700">
                  ${application.income?.toLocaleString("es-CO") || "0"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block sm:inline">
                  Egresos Declarados:
                </span>{" "}
                <span className="font-semibold text-gray-700">
                  ${application.expenses?.toLocaleString("es-CO") || "0"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block sm:inline">
                  Monto Solicitado:
                </span>{" "}
                <span className="font-bold text-blue-900">
                  ${application.requestedAmount?.toLocaleString("es-CO") || "0"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block sm:inline">
                  Plazo Deseado:
                </span>{" "}
                <span className="font-semibold text-gray-700">
                  {application.desiredTerm} Meses
                </span>
              </div>
            </div>

            {application.loanPurpose && (
              <div className="text-xs mt-2 p-2 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-500 font-medium">
                  Destino del crédito:
                </span>
                <p className="text-gray-700 italic mt-0.5">
                  {application.loanPurpose}
                </p>
              </div>
            )}

            {application.status === ApplicationStatus.ABANDONED &&
              application.abandonmentReason && (
                <div
                  className="text-xs mt-2 p-2 bg-red-50 text-red-800 rounded border border-red-100"
                  role="alert"
                >
                  <span className="font-bold">
                    Motivo del Desistimiento (Abandono):
                  </span>
                  <p className="italic mt-0.5">
                    {application.abandonmentReason}
                  </p>
                </div>
              )}
          </div>
        </section>
      </div>

      <aside
        className="bg-white p-4 sm:p-6 shadow-sm rounded-xl border border-gray-100 space-y-4 h-fit"
        aria-labelledby="timeline-heading"
      >
        <div>
          <h2 id="timeline-heading" className="text-sm font-bold text-gray-800">
            Trazabilidad de Eventos
          </h2>
          <p className="text-[10px] text-gray-400">
            Historial cronológico de auditoría y estados
          </p>
        </div>

        <ol className="relative border-l-2 border-gray-100 ml-2 pl-4 space-y-6 py-2">
          {timeline.length === 0 ? (
            <li className="text-xs text-gray-400 italiclist-none">
              No se registran eventos aún.
            </li>
          ) : (
            timeline.map((event: any) => (
              <li key={event.id} className="relative text-xs">
                <div
                  className="absolute -left-[21px] mt-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"
                  aria-hidden="true"
                />

                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>{event.action}</span>
                  <time dateTime={event.timestamp}>
                    {new Date(event.timestamp).toLocaleTimeString("es-CO", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                <p className="font-semibold text-gray-700 mt-0.5">
                  Cambio:{" "}
                  <span className="text-gray-400 font-normal">
                    {event.previousStatus}
                  </span>{" "}
                  <span aria-hidden="true">→</span>{" "}
                  <span className="text-blue-600">{event.currentStatus}</span>
                </p>

                {event.notes && (
                  <p className="text-[11px] text-gray-500 bg-gray-50 p-1.5 rounded mt-1 border border-gray-200/50 italic">
                    {event.notes}
                  </p>
                )}
              </li>
            ))
          )}
        </ol>
      </aside>
    </div>
  );
}
