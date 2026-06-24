import { Metadata } from "next";
import { ApplicationService } from "@/core/applications/service";
import { ApplicationWizardContainer } from "@/components/applications/ApplicationWizardContainer";

interface NewApplicationPageProps {
  searchParams: Promise<{ id?: string }>;
}

export const metadata: Metadata = {
  title: "Radicación de Solicitud | NexaCredit",
  description:
    "Formulario guiado para la creación, edición y radicación de solicitudes de crédito de libre destino.",
};

export default async function NewApplicationPage({
  searchParams,
}: NewApplicationPageProps) {
  const { id } = await searchParams;
  let retrievedSavedData = null;

  if (id) {
    retrievedSavedData = await ApplicationService.findOne(id);
  }

  return (
    <div className="max-w-3xl mx-auto my-2 sm:my-4 p-4 sm:p-8 bg-white shadow-md rounded-xl border border-gray-100">
      <ApplicationWizardContainer savedData={retrievedSavedData ?? undefined} />
    </div>
  );
}
