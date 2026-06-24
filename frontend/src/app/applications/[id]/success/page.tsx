import Link from "next/link";
import { ApplicationService } from "@/core/applications/service";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;

  let application = null;
  application = await ApplicationService.findOne(id);

  return (
    <div className="max-w-xl mx-auto my-16 p-8 bg-white shadow-md rounded-xl border border-gray-100 text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
        ✓
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-black text-gray-800">
          ¡Crédito Confirmado Exitosamente!
        </h1>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          {application?.fullName ? `${application.fullName}, tu` : "Tu"}{" "}
          solicitud de originación digital ha sido procesada con éxito en los
          sistemas centrales.
        </p>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-left space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Detalles del Registro
        </p>
        <div className="text-xs text-gray-600 space-y-1 font-mono">
          <div>
            <span className="font-bold text-gray-700">ID de Operación:</span>{" "}
            {id}
          </div>
          {application?.requestedAmount && (
            <div>
              <span className="font-bold text-gray-700">Monto Final:</span> $
              {application.requestedAmount.toLocaleString("es-CO")}
            </div>
          )}
          <div>
            <span className="font-bold text-gray-700">Canal de Registro:</span>{" "}
            {application?.channel}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Un asesor se pondrá en contacto en las próximas horas si se requiere
        validación documental física.
      </p>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 text-sm transition-colors shadow-sm"
        >
          Regresar al Inicio
        </Link>
      </div>
    </div>
  );
}
