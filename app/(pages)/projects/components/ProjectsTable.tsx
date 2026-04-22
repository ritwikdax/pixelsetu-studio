"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useProjects } from "@/app/queries";
import { Loading } from "@ritwikdax/uicc";
import { Table } from "@radix-ui/themes";
import { useProjectTableColumns } from "../hooks/useProjectColumns";
import { FilterBar } from "@/app/components";
import { useRouter } from "next/navigation";
import { useProjectsByFilter } from "@/app/queries/useProjectsByFilter";
import EmptyState from "@/app/components/EmptyState";

export default function ProjectsTable() {
  //const { data: projects = [], isLoading } = useProjects();
  const { data: projects = [], isLoading } = useProjectsByFilter();
  const router = useRouter();
  const columns = useProjectTableColumns();

  const table = useReactTable({
    data: projects as any[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && projects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="You haven't created any projects yet or your current filters didn't match any projects. Get started by adding your first project."
      />
    );
  }

  return (
    <>
      <Table.Root size="2">
        <Table.Header style={{ backgroundColor: "var(--accent-1)" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row
              key={row.id}
              className="table-row-hover"
              onClick={() => {
                router.push(`/projects/${row.original.id}`);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
