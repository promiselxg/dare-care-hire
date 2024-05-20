"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { Cross } from "lucide-react";
import { OutsourcedDataTable } from "../_components/table/outsourced/data-table";
import { columns } from "../_components/table/outsourced/columns";
import DashboardCard from "../_components/stats/Card";
import { Button } from "@/components/ui/button";
import "../../admin/dashboard.css";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import useFetch from "@/hooks/useFetch";

const OutsourcedPage = () => {
  const { loading, data } = useFetch("/outsourced");

  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Amount"
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
              `${raleway.className} uppercase font-[600] my-4 md:my-0`
            )}
          >
            Outsourced Driver&apos;s
          </h1>
          <Link href="/admin/outsourced/add">
            <Button className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]">
              <Cross size={13} /> Add new Outsourced Driver
            </Button>
          </Link>
        </div>
        <OutsourcedDataTable columns={columns} data={data} loading={loading} />
      </section>
    </>
  );
};

export default OutsourcedPage;
