import Link from "next/link";
import { ApplicationService } from "@/core/applications/service";
import {
  ApplicationStatus,
  CustomerChannel,
  IApplication,
} from "@/core/applications/types";

interface AdminPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    channel?: string;
  }>;
}

export default async function AdminApplicationsPage({
  searchParams,
}: AdminPageProps) {
  const filters = await searchParams;
  let applications: IApplication[] = [];
  try {
    applications = await ApplicationService.findAll({
      search: filters.search,
      status: filters.status,
      channel: filters.channel,
    });
  } catch (error) {
    console.error("Error cargando solicitudes administrativas", error);
  }

  return (
    <div className="max-w-6xl mx-auto my-4 p-6 bg-white shadow-sm rounded-xl border border-gray-100 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mesa de Control</h1>
          <p className="text-xs text-gray-500">
            Administración y seguimiento de solicitudes de crédito de libre
            destino
          </p>
        </div>
        <Link
          href="/applications/new"
          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nueva Solicitud
        </Link>
      </div>

      <form
        method="GET"
        className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200"
      >
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-gray-500 uppercase">
            Buscar Cliente / Documento
          </label>
          <input
            type="text"
            name="search"
            defaultValue={filters.search || ""}
            placeholder="Ej: Raul Coral o 1015..."
            className="p-2 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-gray-500 uppercase">
            Filtrar por Estado
          </label>
          <select
            name="status"
            defaultValue={filters.status || ""}
            className="p-2 border border-gray-300 rounded-lg text-xs bg-white"
          >
            <option value="">Todos los estados</option>
            {Object.values(ApplicationStatus).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-gray-500 uppercase">
            Filtrar por Canal
          </label>
          <select
            name="channel"
            defaultValue={filters.channel || ""}
            className="p-2 border border-gray-300 rounded-lg text-xs bg-white"
          >
            <option value="">Todos los canales</option>
            <option value={CustomerChannel.SELF_MANAGED}>
              {CustomerChannel.SELF_MANAGED}
            </option>
            <option value={CustomerChannel.ASSISTED}>
              {CustomerChannel.ASSISTED}
            </option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white text-xs font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </form>

      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4">Cliente / Documento</th>
              <th className="p-4">Canal</th>
              <th className="p-4">Monto Solicitado</th>
              <th className="p-4">Estado</th>
              <th className="p-4">Fecha de Creación</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-600 divide-y divide-gray-100">
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-400 font-medium"
                >
                  No se encontraron solicitudes que coincidan con los filtros
                  aplicados.
                </td>
              </tr>
            ) : (
              applications.map((app: any) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-bold text-gray-800">
                      {app.fullName || "N/A"}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {app.documentType?.split(" ")[0]} {app.documentNumber}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${app.channel === CustomerChannel.SELF_MANAGED ? "bg-purple-50 text-purple-700" : "bg-orange-50 text-orange-700"}`}
                    >
                      {app.channel}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-700">
                    {app.requestedAmount
                      ? `$${app.requestedAmount.toLocaleString("es-CO")}`
                      : "Sin definir"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === "Finalizada"
                          ? "bg-green-50 text-green-700"
                          : app.status === "Borrador"
                            ? "bg-gray-100 text-gray-600"
                            : app.status === "Viable"
                              ? "bg-blue-50 text-blue-700"
                              : app.status === "No Viable"
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {new Date(app.createdAt).toLocaleDateString("es-CO")}
                  </td>
                  <td className="p-4 text-right flex-col">
                    {app.status === ApplicationStatus.DRAFT ||
                    app.status === ApplicationStatus.VIABLE ? (
                      <>
                        <Link
                          href={`/applications/new?id=${app.id}`}
                          className="text-blue-600 font-semibold hover:underline block mb-2"
                        >
                          Retomar
                        </Link>
                        <Link
                          href={`/applications/${app.id}`}
                          className="text-gray-600 font-semibold hover:underline block"
                        >
                          Ver Detalle
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/applications/${app.id}`}
                        className="text-gray-600 font-semibold hover:underline"
                      >
                        Ver Detalle
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
