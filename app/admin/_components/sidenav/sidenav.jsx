"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  AtSign,
  CarFront,
  CarIcon,
  LayoutDashboard,
  Plus,
  Power,
  Settings,
  StickyNote,
  User2Icon,
  Users,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { barlow } from "@/lib/fonts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import { getCookie } from "@/utils/verifyToken";
import AuthModal from "../modal/passwordModal";
import UsernameModal from "../modal/usernameModal";
import { truncateText } from "@/utils/trucateText";

const SideNav = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [token, setToken] = useState(null);
  const currentRoute = usePathname();
  const router = useRouter();
  const { user, openNavBar, handleLogOut, hanldeOpenNav } =
    useContext(AuthContext);

  useEffect(() => {
    const getToken = async () => {
      const res = await getCookie();
      setToken(res);
    };
    getToken();
  }, [router]);

  return (
    <>
      <ScrollArea
        className={cn(
          `${
            barlow.className
          }  bg-[#191919] text-[#757575] hidden sticky top-0 bottom-0 md:relative h-screen navbar md:flex ${
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
              <li
                className={`${
                  currentRoute === "/admin/dashboard" && "active"
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/dashboard?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </li>
              <li
                className={`${
                  (currentRoute === "/admin/drivers" && "active") ||
                  (currentRoute === "/admin/drivers/add" && "active") ||
                  (currentRoute.includes("/admin/drivers/edit/") && "active")
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/drivers?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <CarFront size={18} />
                  Drivers
                </Link>
              </li>
              <li
                className={`${
                  currentRoute === "/admin/customers" && "active"
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/customers?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <UsersRound size={18} />
                  Customers
                </Link>
              </li>
              <li
                className={`${
                  (currentRoute === "/admin/outsourced" && "active") ||
                  (currentRoute === "/admin/outsourced/add" && "active") ||
                  (currentRoute.includes("/admin/outsourced/edit/") && "active")
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/outsourced?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <AtSign size={18} />
                  Outsourced
                </Link>
              </li>
              <li
                className={`${
                  (currentRoute === "/admin/vendors" && "active") ||
                  (currentRoute === "/admin/vendors/add" && "active") ||
                  (currentRoute.includes("/admin/vendors/edit/") && "active")
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/vendors?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Users size={18} />
                  Vendors
                </Link>
              </li>
              <li
                className={`${
                  (currentRoute === "/admin/cars" && "active") ||
                  (currentRoute === "/admin/cars/add" && "active") ||
                  (currentRoute.includes("/admin/cars/edit/") && "active")
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/cars?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <CarIcon size={18} />
                  Vehicles
                </Link>
              </li>
              <Separator
                className="my-2 w-full bg-[rgba(255,255,255,0.1)] "
                orientation="horizontal"
              />
              <li
                className={`${
                  currentRoute === "/admin/users" && "active"
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/users?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <User2Icon size={18} />
                  Users
                </Link>
              </li>
              <Separator
                className="my-2 w-full bg-[rgba(255,255,255,0.1)] "
                orientation="horizontal"
              />
              <span className="my-2 px-3 ">Report</span>

              <li
                className={`${
                  (currentRoute === "/admin/transactions" && "active") ||
                  (currentRoute === "/admin/transactions/add" && "active") ||
                  (currentRoute.includes("/admin/transactions/edit/") &&
                    "active")
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/transactions?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <h1 className="text-[20px]">&#8358;</h1>Transactions
                </Link>
              </li>
              <li
                className={`${
                  currentRoute === "/admin/report/log" && "active"
                } my-[2px] h-10 nav`}
              >
                <Link
                  href={`/admin/report/log?q=${token}`}
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <StickyNote size={18} />
                  Logs
                </Link>
              </li>
              <Separator
                className="my-2 w-full bg-[rgba(255,255,255,0.1)] "
                orientation="horizontal"
              />
              <span className="my-2 px-3 ">Settings</span>
              {/* <li
                className={`${
                  (currentRoute === "/admin/setting" && "active") ||
                  (currentRoute === "/admin/setting/add" && "active") ||
                  (currentRoute.includes("/admin/setting/edit/") && "active")
                } my-[2px] h-10 nav`}
              >
                <Link
                  href="/admin/setting"
                  className="flex gap-2 items-center py-2  h-8 leading-tight relative"
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Settings size={18} />
                  Settings
                </Link>
              </li> */}
              <li
                className={cn(
                  `${openDropDown ? "active" : ""} my-[2px] h-10 nav w-full`
                )}
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                <div className="flex gap-2 items-center py-2  h-8 leading-tight relative">
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Settings size={18} />
                  Settings
                </div>
              </li>
            </ul>
            <ul
              className={cn(
                `${
                  openDropDown
                    ? "showDropDown w-full bg-[--header-bg] text-white border border-[rgba(255,255,255,0.3)] py-1"
                    : "h-0 overflow-hidden"
                } transition-all delay-75`
              )}
            >
              <li className="my-[2px] h-10 hover:text-[--text-brown] transition-all delay-75">
                <Link
                  href={`/admin/setting/type?q=${token}`}
                  className={`${
                    currentRoute === "/admin/setting/type" &&
                    "text-[--text-brown]"
                  } flex gap-2 items-center py-2  h-8 leading-tight relative`}
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Plus size={18} />
                  Vehicle Type
                </Link>
              </li>
              <li className="my-[2px] h-10 hover:text-[--text-brown] transition-all delay-75">
                <Link
                  href={`/admin/setting/model?q=${token}`}
                  className={`${
                    currentRoute === "/admin/setting/model" &&
                    "text-[--text-brown]"
                  } flex gap-2 items-center py-2  h-8 leading-tight relative`}
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Plus size={18} />
                  Vehicle Model
                </Link>
              </li>
              <li className="my-[2px] h-10 hover:text-[--text-brown] transition-all delay-75">
                <Link
                  href={`/admin/setting/feature?q=${token}`}
                  className={`${
                    currentRoute === "/admin/setting/feature" &&
                    "text-[--text-brown]"
                  } flex gap-2 items-center py-2  h-8 leading-tight relative`}
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Plus size={18} />
                  Vehicle Features
                </Link>
              </li>
              <li className="my-[2px] h-10 hover:text-[--text-brown] transition-all delay-75">
                <Link
                  href={`/admin/setting/banner?q=${token}`}
                  className={`${
                    currentRoute === "/admin/setting/banner" &&
                    "text-[--text-brown]"
                  } flex gap-2 items-center py-2  h-8 leading-tight relative`}
                >
                  <span className="w-[1px] h-8 rounded-r-[5px] border-r-4 border-transparent"></span>
                  <Plus size={18} />
                  Manage Site Banner
                </Link>
              </li>
              <li className="my-[2px] h-10 hover:text-[--text-brown] transition-all delay-75">
                <AuthModal />
              </li>
              <li className="my-[2px] h-10 hover:text-[--text-brown] transition-all delay-75">
                <UsernameModal />
              </li>
            </ul>
            <div className="w-full py-5">
              <Button
                className="bg-[#474747] w-full  justify-start flex items-center gap-2 rounded-[8px] text-white font-[600] p-2 hover:bg-[rgb(71,71,71,.8)]"
                onClick={() => handleLogOut()}
              >
                <Power size={18} />
                Logout ({user && truncateText(user?.username, 15)})
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default SideNav;
