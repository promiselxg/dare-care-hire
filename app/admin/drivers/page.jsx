"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { Cross, User } from "lucide-react";
import DashboardCard from "../_components/stats/Card";
import { Button } from "@/components/ui/button";
import "../../admin/dashboard.css";
import { DriversDataTable } from "../_components/table/drivers/data-table";
import { columns } from "../_components/table/drivers/columns";
import Link from "next/link";
import { useContext } from "react";
import { DriverContext } from "@/context/sortContext";
import { formatCurrency } from "@/utils/formatCurrency";

const DriverPage = () => {
  const { data, loading } = useContext(DriverContext);
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Total Drivers"
              icon={<User color="green" />}
              value={data?.length}
              bg="whitesmoke"
              desc="Total number of Drivers"
              loading={loading}
            />
            <DashboardCard
              title="Total Expenditure"
              value={formatCurrency(
                data?.reduce((acc, current) => acc + current.amount, 0)
              )}
              bg="whitesmoke"
              loading={loading}
            />
          </div>
        </div>
        <div className="flex md:items-center md:justify-between w-full my-5 md:my-10 flex-col md:flex-row justify-start items-start">
          <h1
            className={cn(
              `${raleway.className} text-[16px] uppercase font-[600] my-4 md:my-0`
            )}
          >
            Drivers
          </h1>
          <Link href="/admin/drivers/add">
            <Button className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]">
              <Cross size={13} /> Add new Driver
            </Button>
          </Link>
        </div>
        <DriversDataTable columns={columns} data={data} loading={loading} />
      </section>
    </>
  );
};

export default DriverPage;
