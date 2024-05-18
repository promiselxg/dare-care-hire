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
import { formatCurrency } from "@/utils/formatCurrency";
import {
  formatDateTime,
  formatDateWithoutTime,
} from "@/utils/getDateDifference";

import { ArrowUpDown, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { truncateText } from "@/utils/trucateText";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";

export const columns = [
  {
    accessorKey: "organization_name",
    cell: ({ row }) => {
      const { organization_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} font-bold capitalize`)}>
              {organization_name}
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
          Organization&apos;s Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "client_name",
    header: "Client Name",
    cell: ({ row }) => {
      const { client_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} capitalize`)}>
              {client_name}
            </h1>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "job_description",
    header: "Job Description",
    cell: ({ row }) => {
      const { job_description } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${raleway.className} capitalize`)}>
              {truncateText(job_description, 30)}
            </h1>
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
              {formatDateTime(createdAt)}
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
    accessorKey: "driver_name",
    header: "Driver's Name",
    cell: ({ row }) => {
      const { driver_name } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} capitalize`)}>
              {driver_name}
            </h1>
          </div>
        </>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const { organization_name, id } = row.original;

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
              className="flex items-center gap-2 cursor-pointer"
              onClick={(e) => e.preventDefault(e)}
            >
              <Dialog className="w-full ">
                <DialogTrigger className="flex items-center gap-2">
                  <Eye size={16} /> View Record
                </DialogTrigger>
                <DialogContent className="max-w-[50%] ">
                  <DialogHeader>
                    <DialogTitle className="capitalize">
                      {organization_name}
                    </DialogTitle>
                  </DialogHeader>
                  <table
                    className="w-full border justify-start flex"
                    cellPadding={15}
                  >
                    <thead className="w-1/4  flex flex-col">
                      <tr className="border">
                        <th className="w-full">Client&apos;s Name</th>
                      </tr>
                      <tr className="border">
                        <th className="w-full">Pick-up Date</th>
                      </tr>
                      <tr className="border">
                        <th>Drop-off Date</th>
                      </tr>
                      <tr className="border">
                        <th>Pick-up Location</th>
                      </tr>
                      <tr className="border">
                        <th>Drop-off Location</th>
                      </tr>
                      <tr className="border">
                        <th>Vehicle Type</th>
                      </tr>
                      <tr className="border">
                        <th>Vehicle Model</th>
                      </tr>
                      <tr className="border">
                        <th>Description</th>
                      </tr>
                      {row?.original.additional_note && (
                        <tr className="border">
                          <th>Additional Note</th>
                        </tr>
                      )}
                    </thead>
                    <tbody className="w-3/4 flex flex-col capitalize">
                      <tr className="border w-full">
                        <td className="w-full capitalize">
                          {row?.original?.client_name}
                        </td>
                      </tr>
                      <tr className="border w-full">
                        <td className="w-full">
                          {formatDateWithoutTime(row?.original?.pickup_date)}
                        </td>
                      </tr>
                      <tr className="border">
                        <td>
                          {formatDateWithoutTime(row?.original?.pickup_date)}
                        </td>
                      </tr>
                      <tr className="border">
                        <td>{row?.original?.pickup_location}</td>
                      </tr>
                      <tr className="border">
                        <td>{row?.original?.dropoff_location}</td>
                      </tr>
                      <tr className="border">
                        <td>{row?.original?.vehicle_type}</td>
                      </tr>
                      <tr className="border">
                        <td>{row?.original?.vehicle_model}</td>
                      </tr>
                      <tr className="border">
                        <td>{row?.original?.job_description}</td>
                      </tr>
                      {row?.original.additional_note && (
                        <tr className="border">
                          <td>{row?.original?.additional_note}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => alert(id)}
              className=" flex items-center gap-2 cursor-pointer"
            >
              <Link
                href={`/admin/vendor/edit/${id}`}
                className="flex items-center gap-2"
              >
                <Edit2 size={16} /> Edit Record
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteBtn(id, "vendor")}
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
