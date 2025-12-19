"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export interface CategoryColumn {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="capitalize">{row.original.name}</span>,
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.billboardLabel}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
