"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Loading } from "@ritwikdax/uicc";
import { Table } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useAlbums } from "@/app/queries/useAlbums";
import { useAlbumColumns } from "../hooks/useAlbumColumns";
import EmptyState from "@/app/components/EmptyState";

export default function AlbumsTable() {
  const { data: albums = [], isLoading } = useAlbums();
  const router = useRouter();
  const columns = useAlbumColumns();

  const table = useReactTable({
    data: albums as any[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && albums.length === 0) {
    return (
      <EmptyState
        title="No albums found"
        description="You haven't created any albums yet. Get started by adding your first album from a project."
      />
    );
  }

  return (
    <Table.Root size="2">
      <Table.Header style={{ backgroundColor: "var(--bg-panel)" }}>
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
              router.push(`/projects/${row.original.projectId}`);
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
  );
}
