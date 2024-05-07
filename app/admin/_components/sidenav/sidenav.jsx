"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  AtSign,
  BookUser,
  CarFront,
  LayoutDashboard,
  Power,
  Settings,
  StickyNote,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { barlow } from "@/lib/fonts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const SideNav = () => {
  const [openNavBar, setOpenNavBar] = useState(false);

  const hanldeOpenNav = () => {
    setOpenNavBar(!openNavBar);
  };
  return (
    <>
      <ScrollArea
        className={cn(
          `${
            barlow.className
          } flex bg-[#191919] text-[#757575] h-screen navbar ${
            openNavBar ? "w-[5%]" : "w-[20%]"
          }`
        )}
      >
        <div className="p-5 w-full">
          <h1 className="p-2 my-[2px] uppercase" onClick={hanldeOpenNav}>
            Dare Autos
          </h1>
          <div className="relative h-[calc(100vh-100px)]">
            <ul className="flex flex-col ">
              <li className="my-[2px] h-10 active">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </li>
              <li className="my-[2px] h-10 nav">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <CarFront size={18} />
                  Drivers
                </Link>
              </li>
              <li className="my-[2px] h-10 nav">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <UsersRound size={18} />
                  Customers
                </Link>
              </li>
              <li className="my-[2px] h-10 nav">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <AtSign size={18} />
                  Outsourced
                </Link>
              </li>
              <li className="my-[2px] h-10 nav">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <BookUser size={18} />
                  Bookings
                </Link>
              </li>
              <Separator
                className="my-2 w-full bg-[rgba(255,255,255,0.1)] "
                orientation="horizontal"
              />
              <span className="my-2 px-3 ">Report</span>

              <li className="my-[2px] h-10 nav">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <h1 className="text-[20px]">&#8358;</h1>Transactions
                </Link>
              </li>
              <li className="my-[2px] h-10 nav">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <StickyNote size={18} />
                  Car Report
                </Link>
              </li>
              <Separator
                className="my-2 w-full bg-[rgba(255,255,255,0.1)] "
                orientation="horizontal"
              />
              <span className="my-2 px-3 ">Settings</span>
              <li className="my-[2px] h-10 nav">
                <Link
                  href="/"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Settings size={18} />
                  Settings
                </Link>
              </li>
            </ul>
            <div className="absolute bottom-0 w-full">
              <Button className="bg-[#474747] w-full  justify-start flex items-center gap-2 rounded-[8px] text-white font-[600] p-2 hover:bg-[rgb(71,71,71,.8)]">
                <Power size={18} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default SideNav;
