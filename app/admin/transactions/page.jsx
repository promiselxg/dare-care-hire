"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import DashboardCard from "../_components/stats/Card";
import "../../admin/dashboard.css";
import { useContext } from "react";
import { TransactionDataTable } from "../_components/table/transactions/data-table";
import { TransactionContext } from "@/context/transactionSortContext";
import { columns } from "../_components/table/transactions/columns";
import { formatCurrency } from "@/utils/formatCurrency";

const TransactionPage = () => {
  const { data, loading } = useContext(TransactionContext);
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full flex gap-5 flex-col md:flex-row">
          <div className="w-full md:w-2/6">
            <DashboardCard
              title="Revenue"
              value={formatCurrency(
                data
                  ?.filter(
                    (transaction) =>
                      transaction.transaction_status.toLowerCase() ===
                      "completed"
                  )
                  .reduce(
                    (total, transaction) =>
                      total + transaction.transaction_amount,
                    0
                  )
              )}
              bg="whitesmoke"
              desc="revenue generated."
              loading={loading}
            />
          </div>
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Total Transaction"
              value={data?.length}
              bg="whitesmoke"
              desc="Total Count"
              loading={loading}
              bgColor="purple"
            />

            <DashboardCard
              title="Completed"
              value={
                data?.filter(
                  (transaction) =>
                    transaction.transaction_status.toLowerCase() === "completed"
                ).length
              }
              bg="whitesmoke"
              loading={loading}
              bgColor="green"
              desc="Completed count"
            />
            <DashboardCard
              title="Cancelled"
              value={
                data?.filter(
                  (transaction) =>
                    transaction.transaction_status.toLowerCase() === "cancelled"
                ).length
              }
              bg="whitesmoke"
              loading={loading}
              bgColor="darkred"
              desc="Cancelled count"
            />
            <DashboardCard
              title="Pending"
              value={
                data?.filter(
                  (transaction) =>
                    transaction.transaction_status.toLowerCase() === "pending"
                ).length
              }
              bg="whitesmoke"
              loading={loading}
              desc="pending count"
              bgColor="#221"
            />
          </div>
        </div>
        <div className="flex md:items-center md:justify-between w-full my-5 md:my-10 flex-col md:flex-row justify-start items-start">
          <h1
            className={cn(
              `${raleway.className} text-[16px] uppercase font-[600] my-4 md:my-0`
            )}
          >
            View/Manage all Transactions
          </h1>
        </div>
        <TransactionDataTable columns={columns} data={data} loading={loading} />
      </section>
    </>
  );
};

export default TransactionPage;
