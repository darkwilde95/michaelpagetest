import { ApplicationService } from "@/core/applications/service";
import { ApplicationWizardContainer } from "@/components/applications/ApplicationWizardContainer";
import { UpdateApplicationDto } from "@/core/applications/dto/update-application.dto";

interface NewApplicationPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function NewApplicationPage({
  searchParams,
}: NewApplicationPageProps) {
  const { id } = await searchParams;
  let retreivedSavedData;

  if (id) {
    retreivedSavedData = await ApplicationService.findOne(id);
  }

  return (
    <div className="max-w-3xl mx-auto my-4 p-8 bg-white shadow-md rounded-xl border border-gray-100">
      <ApplicationWizardContainer
        applicationId={id}
        savedData={retreivedSavedData}
      />
    </div>
  );
}
