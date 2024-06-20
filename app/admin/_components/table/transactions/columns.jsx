"use client";

import { UpdateAmount } from "@/app/admin/transactions/UpdatePrice";
import { UpdateStatus } from "@/app/admin/transactions/UpdateStatusForm";
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
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTime } from "@/utils/getDateDifference";
import host from "@/utils/host";
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

export const columns = [
  {
    accessorKey: "customer_name",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer&apos;s Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const { customer_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} capitalize`)}>
              {customer_name}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "pickup_date",
    header: "Pick-up Date/Time",
    cell: ({ row }) => {
      const { pickup_date } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} font-bold`)}>
              {formatDateTime(pickup_date)}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "dropoff_date",
    header: "Drop-off Date/Time",
    cell: ({ row }) => {
      const { dropoff_date } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} font-bold`)}>
              {formatDateTime(dropoff_date)}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "trip_purpose",
    header: "Booking Type",
    cell: ({ row }) => {
      const { trip_purpose } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} capitalize`)}>
              {trip_purpose?.replace("_", " ")}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "total_days",
    header: "No of Day(s)",
  },
  {
    accessorKey: "transaction_amount",
    header: "Amount",
    cell: ({ row }) => {
      const { transaction_amount } = row.original;
      return (
        <>
          <div>
            <h1
              className={cn(
                `${barlow.className} font-bold text-[--text-brown]`
              )}
            >
              {formatCurrency(transaction_amount)}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "transaction_status",
    header: "Status",
    cell: ({ row }) => {
      const { transaction_status } = row.original;
      let status = "";
      let color = "text-black";
      if (transaction_status?.toLowerCase() === "pending")
        (status = "Pending"), (color = "text-[--text-brown]");
      if (transaction_status?.toLowerCase() === "completed")
        (status = "completed"), (color = "text-[green]");
      if (transaction_status?.toLowerCase() === "cancelled")
        (status = "cancelled"), (color = "text-[black]");
      return (
        <>
          <div>
            <h1
              className={cn(`${barlow.className} font-bold uppercase ${color}`)}
            >
              {status}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const { id, transaction_status, transaction_id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white w-full md:w-[200px]"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {transaction_status?.toLowerCase() !== "completed" && (
              <div className="px-2 w-full">
                <UpdateStatus transaction_id={transaction_id} id={id} />
              </div>
            )}
            <div className="p-2 w-full">
              <UpdateAmount transaction_id={transaction_id} id={id} />
            </div>
            <DropdownMenuItem className="text-red-400 flex items-center gap-2 cursor-pointer">
              <Link
                href={`${host.host_url}/checkout/${transaction_id}`}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Eye size={16} /> View Transaction
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
