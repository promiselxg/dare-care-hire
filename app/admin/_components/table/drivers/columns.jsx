"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { barlow } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";
import { formatCurrency } from "@/utils/formatCurrency";

import { ArrowUpDown, Edit2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

export const columns = [
  {
    accessorKey: "driver_name",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Driver&apos;s Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const { driver_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} font-bold capitalize`)}>
              {driver_name}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },

  {
    accessorKey: "account_type",
    header: "Account Type",
    cell: ({ row }) => {
      const { account_type } = row.original;
      let type = "";
      if (account_type === "outsourced") type = "Outsourced";
      if (account_type === "inhouse") type = "In-House";
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} font-bold uppercase`)}>
              {type}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const { amount } = row.original;
      return (
        <>
          <div>
            <h1
              className={cn(
                `${barlow.className} font-bold text-[--text-brown]`
              )}
            >
              {formatCurrency(amount)}
            </h1>
          </div>
        </>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className=" flex items-center gap-2 cursor-pointer">
              <Link
                href={`/admin/drivers/edit/${id}`}
                className="flex items-center gap-2"
              >
                <Edit2 size={16} /> Edit Record
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteBtn(id, "driver")}
              className="text-red-400 flex items-center gap-2 cursor-pointer"
            >
              <FiTrash2 /> Delete Record
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
