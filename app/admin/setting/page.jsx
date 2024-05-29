"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import "../../admin/dashboard.css";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Cross } from "lucide-react";
import { useState } from "react";
import { CustomerDataTable } from "../_components/table/customers/data-table";
import { columns } from "../_components/table/setting/vehicle_type/columns";
import { SettingVehicleTypeDataTable } from "../_components/table/setting/vehicle_type/data-table";

const SettingsPage = () => {
  const { loading, data } = useFetch("/transaction");
  const [currentRoute, setCurrentRoute] = useState("vehicle_type");
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="w-full flex gap-2 flex-col md:flex-row">
          <Button
            className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]"
            onClick={() => setCurrentRoute("vehicle_type")}
          >
            <Cross size={13} /> Manage Vehicle Types
          </Button>
          <Button
            className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]"
            onClick={() => setCurrentRoute("extra_features")}
          >
            <Cross size={13} /> Manage Vehicle Extra Features
          </Button>
          <Button
            className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]"
            onClick={() => setCurrentRoute("vehicle_brand")}
          >
            <Cross size={13} /> Manage Vehicle Brands
          </Button>
          <Button
            className="flex gap-2 items-center border-none outline-none bg-[--button-bg] hover:bg-[--button-bg-hover] text-white transition-all delay-75 rounded-[5px]"
            onClick={() => setCurrentRoute("image_slider")}
          >
            <Cross size={13} /> Manage Image Sliders
          </Button>
        </div>
        <div className="flex md:items-center md:justify-between w-full my-5  flex-col md:flex-row justify-start items-start">
          <h1
            className={cn(
              `${raleway.className} uppercase font-[600] my-4 md:my-0`
            )}
          >
            {currentRoute === "vehicle_type" && "Manage Vehicle Types"}
            {currentRoute === "extra_features" &&
              "Manage Vehicle Extra Features"}
            {currentRoute === "vehicle_brand" && "Manage Vehicle Brands"}
            {currentRoute === "image_slider" && "Manage Image Sliders"}
          </h1>
        </div>
        {currentRoute === "vehicle_type" && (
          <SettingVehicleTypeDataTable
            columns={columns}
            data={data}
            loading={loading}
          />
        )}
        {currentRoute === "extra_features" && (
          <CustomerDataTable columns={columns} data={data} loading={loading} />
        )}
        {currentRoute === "vehicle_brand" && (
          <CustomerDataTable columns={columns} data={data} loading={loading} />
        )}
        {currentRoute === "image_slider" && (
          <CustomerDataTable columns={columns} data={data} loading={loading} />
        )}
      </section>
    </>
  );
};

export default SettingsPage;
