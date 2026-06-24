import Link from "next/link";
import { ApplicationService } from "@/core/applications/service";
import { ApplicationStatus } from "@/core/applications/types";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({
  params,
}: DetailPageProps) {
  const { id } = await params;

  let application = null;
  let timeline = [];

  [application, timeline] = await Promise.all([
    ApplicationService.findOne(id),
    ApplicationService.getEvents(id),
  ]);

  return (
    <div className="max-w-5xl mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 shadow-sm rounded-xl border border-gray-100 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Link
                href="/applications"
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                ← Volver al Listado
              </Link>
              <h1 className="text-xl font-bold text-gray-800 mt-1">
                {application.fullName || "Cliente Sin Nombre"}
              </h1>
              <p className="text-[11px] text-gray-400 font-mono">
                ID: {application.id}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-full">
                {application.status}
              </span>

              {(application.advisorId || application.advisorId) && (
                <span
                  className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold rounded-md uppercase tracking-wide"
                  role="status"
                  aria-label={`Proceso asistido por asesor código ${application.advisorId || application.advisorId}`}
                >
                  Asistido • ID:{" "}
                  {application.advisorId || application.advisorId}
                </span>
              )}

              {(application.status === ApplicationStatus.VIABLE ||
                application.status === ApplicationStatus.DRAFT) && (
                <Link
                  href={`/applications/new?id=${application.id}`}
                  className="text-xs text-blue-600 font-semibold hover:underline mt-1"
                >
                  Retomar Proceso
                </Link>
              )}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Información Personal */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Datos Básicos
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Documento:</span>{" "}
                <p className="font-semibold text-gray-700">
                  {application.documentType} - {application.documentNumber}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Ciudad:</span>{" "}
                <p className="font-semibold text-gray-700">
                  {application.city || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Celular:</span>{" "}
                <p className="font-semibold text-gray-700">
                  {application.phoneNumber || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Correo:</span>{" "}
                <p className="font-semibold text-gray-700">
                  {application.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Información Financiera */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Perfil Financiero y Solicitud
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Ingresos Declarados:</span>{" "}
                <p className="font-semibold text-gray-700">
                  ${application.income?.toLocaleString("es-CO") || "0"}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Egresos Declarados:</span>{" "}
                <p className="font-semibold text-gray-700">
                  ${application.expenses?.toLocaleString("es-CO") || "0"}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Monto Solicitado:</span>{" "}
                <p className="font-bold text-blue-900">
                  ${application.requestedAmount?.toLocaleString("es-CO") || "0"}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Plazo Deseado:</span>{" "}
                <p className="font-semibold text-gray-700">
                  {application.desiredTerm} Meses
                </p>
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
            {application.status === "Abandonada" &&
              application.abandonmentReason && (
                <div className="text-xs mt-2 p-2 bg-red-50 text-red-800 rounded border border-red-100">
                  <span className="font-bold">
                    Motivo del Desistimiento (Abandono):
                  </span>
                  <p className="italic mt-0.5">
                    {application.abandonmentReason}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Columna Derecha: Línea de Tiempo de Auditoría */}
      <div className="bg-white p-6 shadow-sm rounded-xl border border-gray-100 space-y-4 h-fit">
        <div>
          <h2 className="text-sm font-bold text-gray-800">
            Trazabilidad de Eventos
          </h2>
          <p className="text-[10px] text-gray-400">
            Historial cronológico de auditoría y estados
          </p>
        </div>

        <div className="relative border-l-2 border-gray-100 ml-2 pl-4 space-y-6 py-2">
          {timeline.length === 0 ? (
            <p className="text-xs text-gray-400 italic">
              No se registran eventos aún.
            </p>
          ) : (
            timeline.map((event: any) => (
              <div key={event.id} className="relative text-xs">
                <div className="absolute -left-[21px] mt-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />

                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>{event.action}</span>
                  <span>
                    {new Date(event.timestamp).toLocaleTimeString("es-CO", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <p className="font-semibold text-gray-700 mt-0.5">
                  Cambio:{" "}
                  <span className="text-gray-400 font-normal">
                    {event.previousStatus}
                  </span>{" "}
                  → <span className="text-blue-600">{event.currentStatus}</span>
                </p>

                {event.notes && (
                  <p className="text-[11px] text-gray-500 bg-gray-50 p-1.5 rounded mt-1 border border-gray-200/50 italic">
                    {event.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
