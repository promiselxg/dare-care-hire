"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { Database } from "lucide-react";
import "../../../admin/dashboard.css";
import useFetch from "@/hooks/useFetch";
import { LogReportTable } from "../../_components/table/report/log/data-table";
import { columns } from "../../_components/table/report/log/columns";
import DashboardCard from "../../_components/stats/Card";

const LogPage = () => {
  const { loading, data } = useFetch("/report/log");

  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Total Logs"
              icon={<Database color="green" />}
              value={data?.length}
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
            Site Activity Logs
          </h1>
        </div>
        <LogReportTable columns={columns} data={data} loading={loading} />
      </section>
    </>
  );
};

export default LogPage;
