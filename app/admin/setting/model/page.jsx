"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import "../../../admin/dashboard.css";
import useFetch from "@/hooks/useFetch";
import { SettingVehicleBrandDataTable } from "../../_components/table/setting/vehicle_brand/data-table";
import { VehicleBrandColumns } from "../../_components/table/setting/vehicle_brand/columns";

const SettingsPage = () => {
  const { loading, data } = useFetch("/setting/vehicle_brand");

  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="flex md:items-center md:justify-between w-full my-5  flex-col md:flex-row justify-start items-start">
          <h1
            className={cn(
              `${raleway.className} uppercase font-[600] my-4 md:my-0`
            )}
          >
            Manage Vehicle Model
          </h1>
        </div>
        <SettingVehicleBrandDataTable
          columns={VehicleBrandColumns}
          data={data}
          loading={loading}
        />
      </section>
    </>
  );
};

export default SettingsPage;
