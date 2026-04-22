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

export default function ProjectsTable() {
  const { data: projects = [], isLoading } = useProjects();
  const router = useRouter();
  const columns = useProjectTableColumns();

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FilterBar
        onFiltersChange={(filter) => {
          console.log(filter);
        }}
      />
      <Table.Root size="2">
        <Table.Header style={{ backgroundColor: "var(--gray-2)" }}>
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
