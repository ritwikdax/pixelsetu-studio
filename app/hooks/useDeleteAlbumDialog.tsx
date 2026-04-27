import { DialogFooter, Text, useDialog } from "@ritwikdax/uicc";
import { useDeleteAlbumMutation } from "../mutations/useDeleteAlbumMutation";

export function useDeleteAlbumDialog() {
  const { show, hide } = useDialog();
  const deleteMutation = useDeleteAlbumMutation();

  return {
    show: (albumId: string) =>
      show({
        size: "lg",
        title: "Delete Album",
        onClose: hide,
        content: (
          <Text size="2">
            Are you sure you want to delete this album? This action cannot be
            undone.
          </Text>
        ),
        footer: (
          <DialogFooter
            secondaryButton={{
              children: "Cancel",
              variant: "outline",
              color: "gray",
              onClick: hide,
              size: "3",
            }}
            primaryButton={{
              size: "3",
              children: "Delete",
              color: "red",
              onClick: () => {
                deleteMutation.mutate(albumId);
                hide();
              },
            }}
          />
        ),
      }),
    hide,
  };
}
