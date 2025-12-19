"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export interface ProductColumn {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <span
          className="block size-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
        {row.original.color}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
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
