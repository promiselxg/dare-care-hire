"use client";
import { barlow, syne, raleway, montserrat } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { truncateText } from "@/utils/trucateText";
import Link from "next/link";
import SkeletonLoader from "../_component/Loader";
import { Helmet } from "react-helmet";

const Page = () => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useFetch("/car");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Auto Listing</title>
        <meta name="description" content="Vhicle Listing" />
      </Helmet>
      {loading ? (
        <div className="fixed top-0 bottom-0 w-full bg-[rgba(0,0,0,.8)] z-[999] h-screen overflow-hidden text-white flex items-center justify-center flex-col gap-y-2">
          <Loader2 className="animate-spin" size={50} />
          loading...
        </div>
      ) : (
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
                        tabIndex="0"
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
                  {loading ? (
                    <SkeletonLoader />
                  ) : (
                    data?.map((car) => (
                      <Link href={`/cars/${car?.id}`} key={car?.id}>
                        <div className="bg-white flex flex-col w-full md:w-[280px] justify-center text-center items-center  carousel-item">
                          <Image
                            src={car?.imgThumbnail}
                            width={250}
                            height={100}
                            alt={car?.vehicle_name}
                            className="object-cover w-full h-[150px] "
                          />
                          <div className="w-full p-3 bg-[whitesmoke] h-fit md:h-[300px] relative">
                            <div className="flex justify-center text-center flex-col">
                              <h1
                                className={cn(
                                  `${barlow.className} font-[600] text-[20px] capitalize`
                                )}
                              >
                                {car?.vehicle_name}
                              </h1>
                              <ul className="w-full text-center my-3 pb-2 border-b-[1px] border-b-[#ddd] gap-2 flex justify-center"></ul>
                              <ul className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 text-[12px] my-5">
                                {car?.features
                                  ?.split(",")
                                  ?.map((feature, i) => (
                                    <li
                                      className="flex items-center mb-[4px] gap-1"
                                      key={i}
                                    >
                                      <ShieldCheck size={20} />
                                      <span className="capitalize">
                                        {truncateText(feature, 20)}
                                      </span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div className="w-full flex justify-between items-start mt-5 mb-2 flex-col space-y-3 md:absolute md:bottom-5">
                              <h1
                                className={cn(
                                  `${montserrat.className} font-[600] text-[18px]`
                                )}
                              >
                                &#8358;
                                {new Intl.NumberFormat().format(car?.amount)}
                              </h1>
                              <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                                rent it
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Page;
