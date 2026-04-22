"use client";
import { Box, Loading, StandardCard } from "@ritwikdax/uicc";
import ProjectForm from "./ProjectForm";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useCreateProjectMutation } from "@/app/mutations/useCreateProjectMutation";
import { useUpdateProjectMutation } from "@/app/mutations/useUpdateProjectMutation";
import { useProjectById } from "@/app/queries/useProjectById";
import { Project } from "@/app/interfaces/entity";

interface ManageProjectProps {
  mode: "create" | "edit";
}

const PROJECT_FORM_DEFAULT_VALUES: Omit<Project, "id"> = {
  name: "",
  status: "open",
  bookingCategory: "wedding",
  phone: "",
  displayName: "",
  dateOfBooking: new Date(),
  email: "",
  quotationAmount: 0,
};

export default function ManageProject({ mode }: ManageProjectProps) {
  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation();
  const { data, isLoading } = useProjectById();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <StandardCard
        title={mode === "create" ? "Add Project" : "Edit Project"}
        icon={<BookmarkFilledIcon />}
      >
        <ProjectForm
          isLoading={
            mode === "create"
              ? createMutation.isPending
              : updateMutation.isPending
          }
          onSubmit={(data) => {
            if (mode === "create") {
              createMutation.mutate(data);
            } else {
              updateMutation.mutate(data);
            }
          }}
          defaultValues={
            mode === "create" ? PROJECT_FORM_DEFAULT_VALUES : data!
          }
        />
      </StandardCard>
    </div>
  );
}
