"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import "../../../admin/dashboard.css";
import useFetch from "@/hooks/useFetch";
import { VehicleExtraFeatures } from "../../_components/table/setting/extra_features/columns";
import { SettingVehicleFeaturesDataTable } from "../../_components/table/setting/extra_features/data-table";

const SettingsPage = () => {
  const { loading, data } = useFetch("/setting/extra_feature");

  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="flex md:items-center md:justify-between w-full my-5  flex-col md:flex-row justify-start items-start">
          <h1
            className={cn(
              `${raleway.className} uppercase font-[600] my-4 md:my-0`
            )}
          >
            Manage Vehicle Extra Features
          </h1>
        </div>
        <SettingVehicleFeaturesDataTable
          columns={VehicleExtraFeatures}
          data={data}
          loading={loading}
        />
      </section>
    </>
  );
};

export default SettingsPage;
