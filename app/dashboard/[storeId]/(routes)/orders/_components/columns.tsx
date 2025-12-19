"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface OrderColumn {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  products: string;
  totalPrice: number;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.isPaid ? "Yes" : "No"}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
