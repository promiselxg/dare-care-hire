"use client";
import { BookA } from "lucide-react";
import Header from "../_components/header/Header";
import DashboardCard from "../_components/stats/Card";
import SalesAnalytics from "../_components/graph/sales-analytics/SalesAnalytics";
import SalesReport from "../_components/graph/sales-report/SalesReport";
import { TransactionDataTable } from "../_components/table/transactions/data-table";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { columns } from "../_components/table/transactions/columns";
import { useContext } from "react";
import { TransactionContext } from "@/context/transactionSortContext";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  categorizeTransactionsByMonth,
  countTransactionStatus,
} from "@/utils/categorizeTransactions";

const Dashboard = () => {
  const { sortedData, data, loading } = useContext(TransactionContext);
  const salesAnalytics = categorizeTransactionsByMonth(sortedData);
  const salesReport = countTransactionStatus(data);
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <Header />
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
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
              loading={loading}
            />
            <DashboardCard
              title="Transaction count"
              icon={<BookA color="orange" />}
              value={data?.length}
              bg="whitesmoke"
              loading={loading}
              bgColor="darkblue"
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
              loading={loading}
            />
          </div>
        </div>
        {data?.length > 0 && (
          <div className="w-full my-4">
            <div className="flex justify-between gap-3 flex-col md:flex-row">
              <SalesAnalytics data={salesAnalytics} label="Sales Analystics" />
              <SalesReport data={salesReport} label="Sales Report" />
            </div>
          </div>
        )}
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
