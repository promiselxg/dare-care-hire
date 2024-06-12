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
import { formatDateWithoutTime } from "@/utils/getDateDifference";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { handleDeleteBtn } from "@/utils/deleteItemFromDb";

export const UsersColumn = [
  {
    accessorKey: "username",
    cell: ({ row }) => {
      const { username } = row.original;
      return (
        <>
          <div>
            <h1 className={cn(`${barlow.className} uppercase font-[600]`)}>
              {username}
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
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Assigned Privilage",
    cell: ({ row }) => {
      const { role } = row.original;
      return (
        <>
          <div>
            <h1
              className={cn(
                `${raleway.className} text-[--text-hover] font-[600]`
              )}
            >
              <ul className="flex gap-2">
                {role.map((r, i) => {
                  return (
                    <li
                      key={i}
                      className={`${cn(
                        `${
                          r === "moderator" ? "bg-[#000]" : "bg-[#007eff]"
                        } rounded-[5px] px-2 md:py-1 md:px-2 text-white text-[10px] md:text-[12px]`
                      )}`}
                    >
                      {r}
                    </li>
                  );
                })}
              </ul>
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
      const { id, role } = row.original;
      const isAdmin = role.includes("Administrator");
      return (
        <DropdownMenu>
          {!isAdmin && (
            <>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleDeleteBtn(id, "users")}
                  className="text-red-400 flex items-center gap-2 cursor-pointer"
                >
                  <FiTrash2 /> Delete Record
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          )}
        </DropdownMenu>
      );
    },
  },
];
