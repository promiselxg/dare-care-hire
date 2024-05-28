"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { barlow, open_sans, raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateTime } from "@/utils/getDateDifference";

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
              {formatDateTime(createdAt)?.split(" at ")[0]}
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
      const { organization_name, id, pickup_date, dropoff_date } = row.original;

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
                <DialogContent className="md:max-w-[50%] ">
                  <DialogHeader>
                    <DialogTitle className="capitalize">
                      {organization_name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="w-full flex h-[500px] md:h-[500px] overflow-y-scroll">
                    <div className="w-full grid md:grid-cols-2 grid-col-1 ">
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Client&apos;s Name
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <div
                          className={cn(
                            `${raleway.className} font-bold capitalize`
                          )}
                        >
                          {row?.original?.client_name}
                        </div>
                      </div>
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Pick-up Date
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          {pickup_date}
                        </div>
                      </div>
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Drop-off Date
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          {dropoff_date}
                        </div>
                      </div>
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Pick-up Location
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <div className={cn(`${raleway.className} capitalize`)}>
                          {row?.original?.pickup_location}
                        </div>
                      </div>
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Drop-off Location
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <div className={cn(`${raleway.className} capitalize`)}>
                          {row?.original?.dropoff_location}
                        </div>
                      </div>
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Vehicle Type
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <div className={cn(`${raleway.className} capitalize`)}>
                          {row?.original?.vehicle_type}
                        </div>
                      </div>
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Vehicle Model
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <div className={cn(`${raleway.className} capitalize`)}>
                          {row?.original?.vehicle_model}
                        </div>
                      </div>
                      <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                        <div className={cn(`${raleway.className} font-bold`)}>
                          Description
                        </div>
                      </div>
                      <div className=" justify-start items-start border p-5 w-full ">
                        <p className={cn(`${open_sans.className} text-[12px]`)}>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Error laudantium fuga asperiores soluta, esse
                          blanditiis officia modi provident, dolore corrupti
                          rerum itaque. At earum vel velit modi dicta natus
                          soluta laudantium minima ad maiores ex, veritatis sit
                          maxime numquam, aspernatur officia perferendis.
                          Reiciendis ipsam vitae itaque cupiditate quos omnis
                          libero.
                        </p>
                      </div>
                      {row?.original.additional_note && (
                        <>
                          <div className=" items-start border p-5 w-full bg-[whitesmoke]">
                            <div
                              className={cn(`${raleway.className} font-bold`)}
                            >
                              Additional Note
                            </div>
                          </div>
                          <div className=" justify-start items-start border p-5 w-full ">
                            <div>{row?.original?.additional_note}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem className=" flex items-center gap-2 cursor-pointer">
              <Link
                href={`/admin/vendors/edit/${id}`}
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
