"use client";
import { useState } from "react";
import { Flex, Text, TextField, Button } from "@ritwikdax/uicc";

interface SecuredConfirmDialogBodyProps {
  message: string;
  confirmationWord?: string;
  onSecuredConfirm: () => void | Promise<void>;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default function SecuredConfirmDialogBody({
  message,
  confirmationWord = "delete",
  onSecuredConfirm,
  onCancel,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}: SecuredConfirmDialogBodyProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isConfirmEnabled =
    inputValue.toLowerCase() === confirmationWord.toLowerCase();

  const handleConfirm = async () => {
    if (!isConfirmEnabled) return;

    setIsSubmitting(true);
    try {
      await onSecuredConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Text size="2" mb="4">
        {message}
      </Text>

      <Flex direction="column" gap="2" mb="4">
        <Text size="2" weight="medium">
          Type <Text weight="bold">{confirmationWord}</Text> to confirm:
        </Text>
        <TextField.Root
          size="3"
          placeholder={`Type "${confirmationWord}" here`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
      </Flex>

      <Flex justify="end" gap="2">
        <Button
          size="3"
          variant="outline"
          color="gray"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelButtonText}
        </Button>
        <Button
          size="3"
          color="red"
          onClick={handleConfirm}
          disabled={!isConfirmEnabled || isSubmitting}
        >
          {isSubmitting ? "Processing…" : confirmButtonText}
        </Button>
      </Flex>
    </>
  );
}
