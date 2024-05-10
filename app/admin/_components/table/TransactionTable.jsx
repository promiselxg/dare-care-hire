"use client";

import React, { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { SlidersVertical } from "lucide-react";
import { TransactionDataTable } from "./transactions/data-table";
import { columns } from "./transactions/columns";

const TransactionTable = () => {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      pick_up_date: "",
      drop_off_date: "",
      type: "Within Abuja",
      duration: "2 Days",
      customer: "m@example.com",
    },
  ];
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState();

  useEffect(() => {
    setFormattedDate(format(date, "PPP"));
  }, [date]);
  return (
    <>
      <div className="p-5 bg-white rounded-[12px]">
        <div className="flex items-center justify-between w-full ">
          <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
            Today&apos;s Booking
          </h1>
          <Popover>
            <PopoverTrigger
              className={cn(
                `${raleway.className} capitalize font-[600] bg-[whitesmoke] border-none outline-none w-fit rounded-md p-3 flex gap-3 items-center`
              )}
            >
              {!date ? "Filter" : formattedDate} <SlidersVertical size={18} />
            </PopoverTrigger>
            <PopoverContent className="bg-white">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className=""
              />
            </PopoverContent>
          </Popover>
        </div>
        <TransactionDataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default TransactionTable;
