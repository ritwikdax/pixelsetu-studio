"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Album } from "@/app/interfaces/entity";
import { Badge } from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";
import SelectionStatus from "../components/SelectionStatus";
import SelectionProgress from "@/app/components/SelectionProgress";
import { ThreeDotActions } from "@/app/components";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteAlbumDialog } from "@/app/hooks/useDeleteAlbumDialog";

const statusConfig: Record<
  Album["status"],
  { label: string; color: "gray" | "blue" | "green" }
> = {
  not_started: { label: "Not Started", color: "gray" },
  in_progress: { label: "In Progress", color: "blue" },
  submitted: { label: "Submitted", color: "green" },
};

export function useAlbumColumns(): ColumnDef<Album>[] {
  const router = useRouter();
  const { show } = useDeleteAlbumDialog();

  return useMemo<ColumnDef<Album>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Album Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "projectName",
        header: "Project",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue<Album["status"]>();
          const { label, color } = statusConfig[value || "not_started"];
          return <Badge color={color}>{label}</Badge>;
        },
      },
      {
        accessorKey: "maxSelectionCount",
        header: "Progress",
        cell: (info) => (
          <SelectionProgress
            current={info.row.original.alreadySelectedCount ?? 0}
            max={info.getValue<number>() ?? 0}
          />
        ),
      },
      {
        accessorKey: "isSelectionAllowed",
        header: "Selection",
        cell: (info) => (
          <SelectionStatus isSelectionAllowed={info.getValue<boolean>()} />
        ),
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
                    `/projects/${info.row.original.projectId}/edit-album/${info.row.original.id}`,
                  );
                },
              },
              {
                label: "Delete",
                value: "delete",
                icon: <RiDeleteBinLine width="16" height="16" />,
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
