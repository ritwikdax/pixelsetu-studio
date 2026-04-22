"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Project } from "../../../interfaces/entity";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { ThreeDotActions } from "@/app/components";
import ProjectStatus from "../components/ProjectStatus";
import ProjectBookingCategory from "../components/ProjectBookingCategory";
import { useRouter } from "next/navigation";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteProjectDialog } from "@/app/hooks/useDeleteProjectDialog";
export function useProjectTableColumns(): ColumnDef<Project>[] {
  const router = useRouter();
  const { show } = useDeleteProjectDialog();

  return useMemo<ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Project Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          return <ProjectStatus status={info.getValue<Project["status"]>()} />;
        },
      },

      {
        accessorKey: "phone",
        header: "Phone",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "bookingCategory",
        header: "Category",
        cell: (info) => {
          const value = info.getValue<Project["bookingCategory"]>();
          return <ProjectBookingCategory category={value} />;
        },
      },
      {
        accessorKey: "softcopyUrl",
        header: "Softcopy",
        cell: (info) => {
          const url = info.getValue<string | undefined>();
          return url ? "✅" : "❌";
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: (info) => {
          return (
            <ThreeDotActions
              items={[
                {
                  label: "Edit",
                  value: "edit",
                  icon: <Pencil2Icon width="16" height="16" />,
                  onClick: () => {
                    router.push(`/projects/edit/${info.row.original.id}`);
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
          );
        },
      },
    ],
    [],
  );
}
