import { BookA, Car, Database, UsersRound } from "lucide-react";
import Header from "../_components/header/Header";
import DashboardCard from "../_components/stats/Card";
import SalesAnalytics from "../_components/graph/sales-analytics/SalesAnalytics";
import SalesReport from "../_components/graph/sales-report/SalesReport";
import salesAnalytics from "@/data/salesAnalytics.json";
import salesReport from "@/data/salesReport.json";
import TransactionTable from "../_components/table/TransactionTable";

const Dashboard = async () => {
  return (
    <>
      <Header />
      <section className="w-full bg-[whitesmoke] h-fit p-5">
        <div className="w-full">
          <div className="w-full grid md:grid-cols-4  grid-cols-1 gap-3">
            <DashboardCard
              title="Revenue"
              icon={<Database color="green" />}
              value="&#8358;5,000"
              bg="whitesmoke"
              desc="+5.5% since last week"
            />
            <DashboardCard
              title="Total Booking"
              icon={<BookA color="orange" />}
              value="400"
              bg="whitesmoke"
              desc="+40 since last week"
            />
            <DashboardCard
              title="Vehicles"
              icon={<Car color="brown" />}
              value="600"
              bg="whitesmoke"
            />
            <DashboardCard
              title="Customers"
              icon={<UsersRound color="green" />}
              value="1000"
              bg="whitesmoke"
              desc="+200 since last week"
            />
          </div>
        </div>
        <div className="w-full my-4">
          <div className="flex justify-between gap-3 flex-col md:flex-row">
            <SalesAnalytics data={salesAnalytics} />
            <SalesReport data={salesReport} />
          </div>
        </div>
        <div className="w-full">
          <TransactionTable />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
