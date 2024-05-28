"use client";
import { BookA, Car, Database, UsersRound } from "lucide-react";
import Header from "../_components/header/Header";
import DashboardCard from "../_components/stats/Card";
import SalesAnalytics from "../_components/graph/sales-analytics/SalesAnalytics";
import SalesReport from "../_components/graph/sales-report/SalesReport";
import salesAnalytics from "@/data/salesAnalytics.json";
import salesReport from "@/data/salesReport.json";
import { TransactionDataTable } from "../_components/table/transactions/data-table";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { columns } from "../_components/table/transactions/columns";
import { useContext } from "react";
import { TransactionContext } from "@/context/transactionSortContext";
import { formatCurrency } from "@/utils/formatCurrency";

const Dashboard = () => {
  const { data, loading } = useContext(TransactionContext);
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <Header />
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Revenue"
              icon={<Database color="green" />}
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
              loading={loading}
            />
            <DashboardCard
              title="Transaction count"
              icon={<BookA color="orange" />}
              value={data?.length}
              bg="whitesmoke"
              loading={loading}
            />
            <DashboardCard
              title="Pending Transactions"
              value={
                data?.filter(
                  (transaction) =>
                    transaction.transaction_status.toLowerCase() === "pending"
                ).length
              }
              bg="whitesmoke"
              loading={loading}
              bgColor="darkred"
            />
            <DashboardCard
              title="Completed Transactions"
              value={
                data?.filter(
                  (transaction) =>
                    transaction.transaction_status.toLowerCase() === "completed"
                ).length
              }
              bg="whitesmoke"
              bgColor="green"
              desc="Completed count"
              loading={loading}
            />
          </div>
        </div>
        <div className="w-full my-4">
          <div className="flex justify-between gap-3 flex-col md:flex-row">
            <SalesAnalytics data={salesAnalytics} label="Sales Analystics" />
            <SalesReport data={salesReport} label="Sales Report" />
          </div>
        </div>
        <div className="w-full">
          <div className="p-5 bg-white rounded-[12px]">
            <div className="flex items-center justify-between w-full ">
              <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
                Recent Transactions
              </h1>
            </div>
            <TransactionDataTable
              columns={columns}
              data={data}
              loading={loading}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
