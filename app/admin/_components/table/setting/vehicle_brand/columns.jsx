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
import { UpdateVehicleBrandForm } from "./UpdateForm";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";

export const VehicleBrandColumns = [
  {
    accessorKey: "vehicle_brand",
    cell: ({ row }) => {
      const { vehicle_brand } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
              {vehicle_brand}
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
          Vehicle Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
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
      const { id, vehicle_brand } = row.original;

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
              <UpdateVehicleBrandForm id={id} vehicle_type={vehicle_brand} />
            </div>

            <DropdownMenuItem
              onClick={() => handleDeleteBtn(id, "setting/vehicle_brand")}
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
