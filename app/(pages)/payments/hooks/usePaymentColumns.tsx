"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "@/app/interfaces/entity";
import { Badge } from "@ritwikdax/uicc";
import { ThreeDotActions } from "@/app/components";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useDeletePaymentDialog } from "@/app/hooks/useDeletePaymentDialog";
import { dateFormatter } from "@/app/utils";

const modeConfig: Record<
  Payment["mode"],
  { label: string; color: "blue" | "green" }
> = {
  online: { label: "Online", color: "blue" },
  offline: { label: "Offline", color: "green" },
};

export function usePaymentColumns(): ColumnDef<Payment>[] {
  const router = useRouter();
  const { show } = useDeletePaymentDialog();

  return useMemo<ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: "projectName",
        header: "Project",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => {
          const value = info.getValue<number>();
          return `₹${value.toLocaleString("en-IN")}`;
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) =>
          dateFormatter(new Date(info.getValue<string>()), {
            includeDay: false,
          }),
      },
      {
        accessorKey: "mode",
        header: "Mode",
        cell: (info) => {
          const value = info.getValue<Payment["mode"]>();
          const { label, color } = modeConfig[value];
          return <Badge color={color}>{label}</Badge>;
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: (info) => (
          <ThreeDotActions
            items={[
              {
                label: "Edit",
                value: "edit",
                icon: <Pencil2Icon width="16" height="16" />,
                onClick: () => {
                  router.push(
                    `/projects/${info.row.original.projectId}/edit-payment/${info.row.original.id}`,
                  );
                },
              },
              {
                label: "Delete",
                value: "delete",
                icon: <RiDeleteBinLine width="16" height="16" />,
                color: "red",
                onClick: () => {
                  show(info.row.original.id);
                },
              },
            ]}
          />
        ),
      },
    ],
    [router, show],
  );
}
