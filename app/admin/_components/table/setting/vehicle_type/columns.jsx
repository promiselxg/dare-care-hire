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
import { UpdateVehicleTypeForm } from "./UpdateForm";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";

export const VehicleTypeColumns = [
  {
    accessorKey: "vehicle_type",
    cell: ({ row }) => {
      const { vehicle_type } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
              {vehicle_type}
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
          Vehicle Make
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
      const { id, vehicle_type } = row.original;

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
              <UpdateVehicleTypeForm id={id} vehicle_type={vehicle_type} />
            </div>

            <DropdownMenuItem
              onClick={() => handleDeleteBtn(id, "setting/vehicle_type")}
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
