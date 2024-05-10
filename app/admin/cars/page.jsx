"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { Cross, User } from "lucide-react";
import DashboardCard from "../_components/stats/Card";
import { Button } from "@/components/ui/button";
import "../../admin/dashboard.css";
import { VehicleDataTable } from "../_components/table/cars/data-table";
import { columns } from "../_components/table/cars/columns";

const CarsPage = () => {
  const data = [
    {
      id: "728ed52f",
      amount: "9,800",
      type: "bus",
      date: "2 Days",
      vehicle_name: "Peagout",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, qui.",
    },
    {
      id: "728ed52f",
      amount: "10,000",
      type: "suv",
      date: "2 Days",
      vehicle_name: "Toyota Corolla",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos",
    },
  ];

  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Total"
              icon={<User color="green" />}
              value="25"
              bg="whitesmoke"
              desc="+5.5% since last week"
            />
          </div>
        </div>
        <div className="flex md:items-center md:justify-between w-full my-5 md:my-10 flex-col md:flex-row justify-start items-start">
          <h1
            className={cn(
              `${raleway.className} uppercase font-[600] my-4 md:my-0`
            )}
          >
            Vehicles
          </h1>
          <Button className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]">
            <Cross size={13} /> Add new Vehicle
          </Button>
        </div>
        <VehicleDataTable columns={columns} data={data} />
      </section>
    </>
  );
};

export default CarsPage;
