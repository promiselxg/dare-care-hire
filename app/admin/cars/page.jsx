"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { Cross, User } from "lucide-react";
import DashboardCard from "../_components/stats/Card";
import { Button } from "@/components/ui/button";
import "../../admin/dashboard.css";
import { VehicleDataTable } from "../_components/table/cars/data-table";
import { columns } from "../_components/table/cars/columns";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const CarsPage = () => {
  const { data, loading } = useFetch("/car");
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Total Number of Vehicles"
              icon={<User color="green" />}
              value={data?.length || "0"}
              bg="whitesmoke"
              loading={loading}
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
          <Button className="border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]">
            <Link href="/admin/cars/add" className="flex gap-2 items-center ">
              <Cross size={13} /> Add new Vehicle
            </Link>
          </Button>
        </div>
        <VehicleDataTable columns={columns} data={data} loading={loading} />
      </section>
    </>
  );
};

export default CarsPage;
