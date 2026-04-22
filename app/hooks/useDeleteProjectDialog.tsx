import { useDialog } from "@ritwikdax/uicc";
import SecuredConfirmDialogBody from "../components/SecureConfirmDialogBody";
import { useDeleteProjectMutation } from "../mutations/useDeleteProjectMutation";

export function useDeleteProjectDialog() {
  const { isOpen, show, hide } = useDialog();
  const deleteMutation = useDeleteProjectMutation();

  return {
    show: (projectId: string) =>
      show({
        title: "Delete Project",
        onClose: () => {
          hide();
          // Handle any cleanup if necessary when the dialog closes
        },
        content: (
          <SecuredConfirmDialogBody
            onSecuredConfirm={() => {
              deleteMutation.mutate(projectId); // Replace "projectId" with the actual project ID
              hide();
            }}
            onCancel={hide}
            message="Are you sure you want to delete this project? This action cannot be undone."
          />
        ),
      }),
    hide,
  };
}
