"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { formatDateWithoutTime } from "@/utils/getDateDifference";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { UpdateVehicleExtraFeaturesForm } from "./UpdateForm";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";
import { formatCurrency } from "@/utils/formatCurrency";

export const VehicleExtraFeatures = [
  {
    accessorKey: "extra_feature",
    cell: ({ row }) => {
      const { extra_feature } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
              {extra_feature}
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
          Feature Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
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
                `${raleway.className} text-[--text-hover] font-[600]`
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
    accessorKey: "createdAt",
    header: "Created Date",
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
  {
    id: "action",
    cell: ({ row }) => {
      const { id, extra_feature, amount } = row.original;

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
            <div className="px-2 w-full">
              <UpdateVehicleExtraFeaturesForm
                id={id}
                vehicle_type={extra_feature}
                amount={amount}
              />
            </div>

            <DropdownMenuItem
              onClick={() => handleDeleteBtn(id, "setting/extra_feature")}
              className="text-red-400 flex items-center gap-2 cursor-pointer mt-2"
            >
              <FiTrash2 /> Delete Record
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
