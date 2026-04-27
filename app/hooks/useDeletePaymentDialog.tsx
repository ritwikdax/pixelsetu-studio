import { DialogFooter, Text, useDialog } from "@ritwikdax/uicc";
import { useDeletePaymentMutation } from "../mutations/useDeletePaymentMutation";

export function useDeletePaymentDialog() {
  const { show, hide } = useDialog();
  const deleteMutation = useDeletePaymentMutation();

  return {
    show: (paymentId: string) =>
      show({
        title: "Delete Payment",
        size: "lg",
        onClose: hide,
        content: (
          <Text size="2">
            Are you sure you want to delete this payment? This action cannot be
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
              children: "Delete",
              color: "red",
              size: "3",
              onClick: () => {
                deleteMutation.mutate(paymentId);
                hide();
              },
            }}
          />
        ),
      }),
    hide,
  };
}
