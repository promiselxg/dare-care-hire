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
import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/trucateText";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";

export const columns = [
  {
    accessorKey: "vehicle_name",
    header: ({ column }) => {
      return (
        <span
          className="cursor-pointer flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vehicle Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({ row }) => {
      const { slug, vehicle_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} font-bold`)}>
              <Link
                href={`/cars/${slug}`}
                target="_blank"
                className="hover:underline hover:text-[#e97688] transition-all delay-75 capitalize"
              >
                {vehicle_name}
              </Link>
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { description } = row.original;
      return (
        <>
          <div className="w-fit">
            <p>{truncateText(description, 50)}</p>
          </div>
        </>
      );
    },
  },

  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const { vehicle_name, imgThumbnail } = row.original;
      return (
        <>
          <div className="w-full">
            <Image
              src={imgThumbnail}
              width={100}
              height={50}
              alt={vehicle_name}
              className="w-[80px] object-contain"
            />
          </div>
        </>
      );
    },
  },

  {
    accessorKey: "vehicle_type",
    header: "Vehicle Type",
    cell: ({ row }) => {
      const { vehicle_type } = row.original;
      return (
        <>
          <div className="w-1/2">
            <p className="uppercase">{vehicle_type}</p>
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
          <div className="w-1/2">
            <p className={cn(`${raleway.className} font-bold`)}>
              {formatCurrency(amount)}
            </p>
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
            <DropdownMenuItem
              onClick={() => alert(id)}
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
