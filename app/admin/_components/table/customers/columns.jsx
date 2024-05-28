"use client";

import { barlow, raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { formatDateWithoutTime } from "@/utils/getDateDifference";

import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "customer_name",
    cell: ({ row }) => {
      const { customer_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
              {customer_name}
            </h1>
          </div>
        </>
      );
    },
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
  },
  {
    accessorKey: "customer_phone",
    header: "Customer's Phone Number",
    cell: ({ row }) => {
      const { customer_phone } = row.original;
      return (
        <>
          <div>
            <a href={`tel:${customer_phone}`} className="font-bold">
              {customer_phone}
            </a>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "customer_email",
    header: "Customer Email",
    cell: ({ row }) => {
      const { customer_email } = row.original;
      return (
        <>
          <div>
            <a
              href={`mailto:${customer_email}`}
              className={cn(`${barlow.className} font-bold`)}
            >
              {customer_email}
            </a>
          </div>
        </>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Transaction Date",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <>
          <div>
            <h1
              className={cn(
                `${raleway.className} text-[--text-hover] font-[600]`
              )}
            >
              {formatDateWithoutTime(createdAt)}
            </h1>
          </div>
        </>
      );
    },
  },
];
