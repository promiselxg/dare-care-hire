"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { Cross, User, Users } from "lucide-react";
import DashboardCard from "../_components/stats/Card";
import { Button } from "@/components/ui/button";
import "../../admin/dashboard.css";
import { columns } from "../_components/table/vendors/columns";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { VendorsTable } from "../_components/table/vendors/data-table";
import { formatCurrency } from "@/utils/formatCurrency";

const VendorsPage = () => {
  const { loading, data } = useFetch("/vendor");
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Total"
              icon={<User color="green" />}
              value={data?.length}
              bg="whitesmoke"
              desc="+5.5% since last week"
              loading={loading}
            />
            <DashboardCard
              title="Revenue"
              icon={<Users color="purple" />}
              value={formatCurrency(
                data.reduce((acc, current) => acc + current.amount, 0)
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
            Vendors
          </h1>
          <Button className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]">
            <Link href="/admin/vendors/add" className="flex gap-2 items-center">
              <Cross size={13} /> Add Vendor
            </Link>
          </Button>
        </div>
        <VendorsTable columns={columns} data={data} loading={loading} />
      </section>
    </>
  );
};

export default VendorsPage;
