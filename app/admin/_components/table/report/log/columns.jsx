"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { barlow, raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTime } from "@/utils/getDateDifference";

import { ArrowUpDown, Edit2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

export const columns = [
  {
    accessorKey: "userAgent",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Device
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "urlPath",
    header: "URL Path",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "method",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Method
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const { method } = row.original;
      var color = "";
      if (method === "POST") color = "--text-hover";
      if (method === "PUT") color = "--text-hover";
      if (method === "DELETE") color = "--text-brown";
      return (
        <>
          <div>
            <h1
              className={cn(`${raleway.className} font-[600] text-[${color}]`)}
            >
              {method}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "logStatus",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const { logStatus } = row.original;
      var color = "";
      if (logStatus === "failed") color = "red";
      if (logStatus === "success") color = "green";
      return (
        <>
          <div>
            <h1
              className={cn(
                `${raleway.className} font-[600] uppercase text-[12px] text-[${color}]`
              )}
            >
              {logStatus}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
              {formatDateTime(createdAt)}
            </h1>
          </div>
        </>
      );
    },
  },
];
