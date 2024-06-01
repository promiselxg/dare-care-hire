"use client";
import { montserrat } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { GanttChart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const currentRoute = usePathname();

  const hanldeOpenNav = () => {
    setOpenNavBar(!openNavBar);
  };
  return (
    <>
      <div className="w-full flex bg-[#000]  h-[95px] items-center sticky top-0 z-40">
        <div className="md:container md:w-[80%] md:mx-auto w-full px-2 md:px-0">
          <div className="flex justify-between items-center">
            <div className="w-1/2">
              <Link href="/home">
                <Image
                  src="/images/logo.png"
                  width={150}
                  height={50}
                  alt="logo"
                  className="py-2  object-contain h-[140px]"
                />
              </Link>
            </div>
            <div className="w-1/2 justify-end text-right flex">
              <ul
                className={cn(
                  `${montserrat.className} text-white md:flex items-center gap-5 text-sm uppercase hidden`
                )}
              >
                <li
                  className={`${
                    currentRoute === "/home" && "isactive"
                  } hover:text-[--text-hover] transition-all delay-75`}
                >
                  <Link href="/home">Home</Link>
                </li>
                <li
                  className={`${
                    currentRoute === "/cars" && "isactive"
                  } hover:text-[--text-hover] transition-all delay-75`}
                >
                  <Link href="/cars">Auto Listing</Link>
                </li>
                <li
                  className={`${
                    currentRoute === "/cart" && "isactive"
                  } hover:text-[--text-hover] transition-all delay-75`}
                >
                  <Link href="/cart">Auto Cart</Link>
                </li>
                <li
                  className={`${
                    currentRoute === "/" && "isactive"
                  } hover:text-[--text-hover] transition-all delay-75`}
                >
                  <Link href="/">About Us</Link>
                </li>
                <li
                  className={`${
                    currentRoute === "/" && "isactive"
                  } hover:text-[--text-hover] transition-all delay-75`}
                >
                  <Link href="/">Contact Us</Link>
                </li>
              </ul>
              {!openNavBar ? (
                <GanttChart
                  className="text-white md:hidden cursor-pointer transition-all delay-100"
                  size={40}
                  onClick={hanldeOpenNav}
                />
              ) : (
                <X
                  className="text-white md:hidden cursor-pointer transition-all delay-100"
                  size={35}
                  onClick={hanldeOpenNav}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          `${
            montserrat.className
          }  fixed bottom-0 top-0 h-screen bg-[--secondary-bg] z-50  navbar ${
            openNavBar ? "w-[85%] " : "w-0 overflow-hidden"
          }`
        )}
      >
        <div className="h-screen justify-center items-center flex">
          <ul
            className={cn(
              `${montserrat.className} text-white md:flex items-center gap-5 text-sm uppercase space-y-8`
            )}
          >
            <li
              className={`${
                currentRoute === "/home" && "isactive"
              } hover:text-[--text-hover] transition-all delay-75 text-[18px]`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`${
                currentRoute === "/cars" && "isactive"
              } hover:text-[--text-hover] transition-all delay-75 text-[18px]`}
            >
              <Link href="/cars">Auto Listing</Link>
            </li>
            <li
              className={`${
                currentRoute === "/cart" && "isactive"
              } hover:text-[--text-hover] transition-all delay-75 text-[18px]`}
            >
              <Link href="/cart">Auto Cart</Link>
            </li>
            <li
              className={`${
                currentRoute === "/" && "isactive"
              } hover:text-[--text-hover] transition-all delay-75 text-[18px]`}
            >
              <Link href="/">About Us</Link>
            </li>
            <li
              className={`${
                currentRoute === "/" && "isactive"
              } hover:text-[--text-hover] transition-all delay-75 text-[18px]`}
            >
              <Link href="/">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
