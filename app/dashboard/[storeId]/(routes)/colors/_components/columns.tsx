"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { ColorItem } from "@/components/ui/color-item";

export interface ColorColumn {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => <ColorItem color={row.original.value} />,
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
