"use client";
import { barlow, syne, raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="w-full flex bg-[url('/images/page-img.jpg')] bg-cover pt-[80px] pb-10 bg-fixed bg-right-top relative">
        <span className="bg-[#20262f] absolute top-0 bottom-0 w-full inline-block h-full opacity-0 "></span>
        <div className="container mx-auto flex text-white z-10 md:w-[80%]">
          <div className="text-left">
            <h1
              className={cn(
                `${raleway.className} md:text-[40px] capitalize font-[500] `
              )}
            >
              Auto Listing
            </h1>
            <Breadcrumb>
              <BreadcrumbList
                className={cn(
                  `${raleway.className} font-[400] text-[12px] text-[whitesmoke]`
                )}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Auto Listing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>
      <section className="flex w-full h-fit  py-10">
        <div className="mx-auto md:w-[85%]  flex ">
          <div className="p-10 w-full  flex flex-col gap-y-3">
            {" "}
            <div className="w-full flex items-center gap-5 mb-5">
              <div
                className={cn(
                  `${raleway.className} uppercase font-[600] text-sm flex items-center gap-2`
                )}
              >
                <span className="w-fit">show on page</span>
                <div className="select jelect relative inline-block text-[#888]">
                  <div
                    tabindex="0"
                    role="button"
                    className="jelect-current relative w-full overflow-hidden py-[11px] px-[35px] whitespace-nowrap bg-white text-sm text-[#999] border border-[#eee]"
                    onClick={() => setOpen(!open)}
                  >
                    10 Autos
                  </div>
                  <ul
                    className={cn(
                      `${
                        open ? "flex flex-col" : "hidden"
                      } absolute left-0 right-0  max-h-[194px] overflow-y-auto overflow-x-hidden pl-0 bg-white border border-[#eee]`
                    )}
                    style={{ boxShadow: "1px 1px 4px 1px #eee" }}
                  >
                    <li data-val="10" className="option">
                      10 Autos
                    </li>
                    <li data-val="20" className="option">
                      20 Autos
                    </li>
                    <li data-val="50" className="option">
                      50 Autos
                    </li>
                    <li data-val="-1" className="option">
                      All Autos
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="bg-white flex flex-col w-full md:w-[280px] justify-center text-center items-center">
                <Image
                  src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/1487537941593e2393c6984322098766_0_0.jpg"
                  width={250}
                  height={100}
                  alt="ford"
                  className="object-cover w-full h-[150px] "
                />
                <div className="w-full p-3 bg-[whitesmoke]">
                  <div className="flex justify-center text-center flex-col">
                    <h1
                      className={cn(
                        `${barlow.className} font-[600] text-[20px]`
                      )}
                    >
                      Name of Vehicle
                    </h1>
                    <ul className="w-full text-center my-3 pb-2 border-b-[1px] border-b-[#ddd] gap-2 flex justify-center"></ul>
                    <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 text-[12px] my-5">
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Pay at Pick up</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Automatic</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Unlimited Milage</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Audio input</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>AC</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Free Cancellation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-between items-start md:items-center mt-5 mb-2 flex-col md:flex-row">
                    <h1
                      className={cn(`${syne.className} font-[600] text-[20px]`)}
                    >
                      N10,000/day
                    </h1>
                    <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                      rent it
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-col w-full md:w-[280px] justify-center text-center items-center">
                <Image
                  src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/1487537941593e2393c6984322098766_0_0.jpg"
                  width={250}
                  height={100}
                  alt="ford"
                  className="object-cover w-full h-[150px] "
                />
                <div className="w-full p-3 bg-[whitesmoke]">
                  <div className="flex justify-center text-center flex-col">
                    <h1
                      className={cn(
                        `${barlow.className} font-[600] text-[20px]`
                      )}
                    >
                      Name of Vehicle
                    </h1>
                    <ul className="w-full text-center my-3 pb-2 border-b-[1px] border-b-[#ddd] gap-2 flex justify-center"></ul>
                    <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 text-[12px] my-5">
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Pay at Pick up</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Automatic</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Unlimited Milage</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Audio input</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>AC</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Free Cancellation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-between items-start md:items-center mt-5 mb-2 flex-col md:flex-row">
                    <h1
                      className={cn(`${syne.className} font-[600] text-[20px]`)}
                    >
                      N10,000/day
                    </h1>
                    <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                      rent it
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-col w-full md:w-[280px] justify-center text-center items-center">
                <Image
                  src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/1487537941593e2393c6984322098766_0_0.jpg"
                  width={250}
                  height={100}
                  alt="ford"
                  className="object-cover w-full h-[150px] "
                />
                <div className="w-full p-3 bg-[whitesmoke]">
                  <div className="flex justify-center text-center flex-col">
                    <h1
                      className={cn(
                        `${barlow.className} font-[600] text-[20px]`
                      )}
                    >
                      Name of Vehicle
                    </h1>
                    <ul className="w-full text-center my-3 pb-2 border-b-[1px] border-b-[#ddd] gap-2 flex justify-center"></ul>
                    <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 text-[12px] my-5">
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Pay at Pick up</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Automatic</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Unlimited Milage</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Audio input</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>AC</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Free Cancellation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-between items-start md:items-center mt-5 mb-2 flex-col md:flex-row">
                    <h1
                      className={cn(`${syne.className} font-[600] text-[20px]`)}
                    >
                      N10,000/day
                    </h1>
                    <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                      rent it
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-col w-full md:w-[280px] justify-center text-center items-center">
                <Image
                  src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/1487537941593e2393c6984322098766_0_0.jpg"
                  width={250}
                  height={100}
                  alt="ford"
                  className="object-cover w-full h-[150px] "
                />
                <div className="w-full p-3 bg-[whitesmoke]">
                  <div className="flex justify-center text-center flex-col">
                    <h1
                      className={cn(
                        `${barlow.className} font-[600] text-[20px]`
                      )}
                    >
                      Name of Vehicle
                    </h1>
                    <ul className="w-full text-center my-3 pb-2 border-b-[1px] border-b-[#ddd] gap-2 flex justify-center"></ul>
                    <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 text-[12px] my-5">
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Pay at Pick up</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Automatic</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Unlimited Milage</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Audio input</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>AC</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Free Cancellation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-between items-start md:items-center mt-5 mb-2 flex-col md:flex-row">
                    <h1
                      className={cn(`${syne.className} font-[600] text-[20px]`)}
                    >
                      N10,000/day
                    </h1>
                    <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                      rent it
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-col w-full md:w-[280px] justify-center text-center items-center">
                <Image
                  src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/1487537941593e2393c6984322098766_0_0.jpg"
                  width={250}
                  height={100}
                  alt="ford"
                  className="object-cover w-full h-[150px] "
                />
                <div className="w-full p-3 bg-[whitesmoke]">
                  <div className="flex justify-center text-center flex-col">
                    <h1
                      className={cn(
                        `${barlow.className} font-[600] text-[20px]`
                      )}
                    >
                      Name of Vehicle
                    </h1>
                    <ul className="w-full text-center my-3 pb-2 border-b-[1px] border-b-[#ddd] gap-2 flex justify-center"></ul>
                    <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 text-[12px] my-5">
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Pay at Pick up</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Automatic</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Unlimited Milage</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Audio input</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>AC</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Free Cancellation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-between items-start md:items-center mt-5 mb-2 flex-col md:flex-row">
                    <h1
                      className={cn(`${syne.className} font-[600] text-[20px]`)}
                    >
                      N10,000/day
                    </h1>
                    <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                      rent it
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-col w-full md:w-[280px] justify-center text-center items-center">
                <Image
                  src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/1487537941593e2393c6984322098766_0_0.jpg"
                  width={250}
                  height={100}
                  alt="ford"
                  className="object-cover w-full h-[150px] "
                />
                <div className="w-full p-3 bg-[whitesmoke]">
                  <div className="flex justify-center text-center flex-col">
                    <h1
                      className={cn(
                        `${barlow.className} font-[600] text-[20px]`
                      )}
                    >
                      Name of Vehicle
                    </h1>
                    <ul className="w-full text-center my-3 pb-2 border-b-[1px] border-b-[#ddd] gap-2 flex justify-center"></ul>
                    <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 text-[12px] my-5">
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Pay at Pick up</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Automatic</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Unlimited Milage</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Audio input</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>AC</span>
                      </li>
                      <li className="flex items-center mb-[4px] gap-1">
                        <ShieldCheck size={20} />
                        <span>Free Cancellation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-between items-start md:items-center mt-5 mb-2 flex-col md:flex-row">
                    <h1
                      className={cn(`${syne.className} font-[600] text-[20px]`)}
                    >
                      N10,000/day
                    </h1>
                    <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                      rent it
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
