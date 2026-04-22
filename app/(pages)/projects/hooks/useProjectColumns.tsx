"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Project } from "../../../interfaces/entity";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { ThreeDotActions } from "@/app/components";
import ProjectStatus from "../components/ProjectStatus";
import { Badge } from "@ritwikdax/uicc";
import ProjectBookingCategory from "../components/ProjectBookingCategory";
import { useRouter } from "next/navigation";
import { dateFormatter } from "@/app/utils";
export function useProjectTableColumns(): ColumnDef<Project>[] {
  const router = useRouter();

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
      // {
      //   accessorKey: "dateOfBooking",
      //   header: "Booking Date",
      //   cell: (info) => {
      //     const date = info.getValue<Date>();
      //     return dateFormatter(new Date(date), { includeDay: false });
      //   },
      // },

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
                },
              ]}
              onItemClick={() => {
                router.push(`/projects/edit/${info.row.original.id}`);
              }}
            />
          );
        },
      },
    ],
    [],
  );
}
