"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { ResponsiveBar } from "@nivo/bar";

const SalesAnalytics = ({ data }) => {
  return (
    <>
      <div className="w-full md:w-[70%] bg-white rounded-[8px] p-5">
        <div className="flex items-center justify-between w-full">
          <h1 className={cn(`${raleway.className} capitalize font-[600]`)}>
            Sales Analystics
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
        <div className="h-[250px] md:h-[350px] mt-5">
          <ResponsiveBar
            data={data}
            keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
            indexBy="country"
            margin={{ top: 10, right: 130, bottom: 50, left: 30 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Vehicles",
              legendPosition: "middle",
              legendOffset: 32,
              truncateTickAt: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default SalesAnalytics;
