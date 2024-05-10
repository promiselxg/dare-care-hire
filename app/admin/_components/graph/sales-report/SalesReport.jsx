"use client";

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SalesReport = ({ label, data }) => {
  return (
    <>
      <div className="w-full md:w-[30%] bg-white rounded-[8px] p-5">
        <div className="flex items-center justify-between w-full">
          <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
            {label}
          </h1>
          <Select>
            <SelectTrigger className="bg-[whitesmoke] border-none outline-none w-fit rounded-md py-5 flex gap-5">
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[250px] md:h-[350px] my-5 w-full">
          <ResponsivePie
            data={data}
            margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
            innerRadius={0.3}
            padAngle={0.9}
            cornerRadius={5}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "paired" }}
            borderWidth={1}
            enableArcLinkLabels={false}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            motionConfig="wobbly"
          />
        </div>
      </div>
    </>
  );
};

export default SalesReport;
