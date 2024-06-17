"use client";
import { open_sans, raleway, syne } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Phone } from "lucide-react";

const Page = () => {
  return (
    <>
      <section className="w-full flex bg-[url('/images/page-img.jpg')] bg-cover pt-[40px] md:pt-[80px] pb-10 bg-fixed bg-right-top relative">
        <span className="bg-[#20262f] absolute top-0 bottom-0 w-full inline-block h-full opacity-0 "></span>
        <div className="container mx-auto flex text-white z-10 md:w-[80%] w-full">
          <div className="text-left">
            <h1
              className={cn(
                `${raleway.className} md:text-[40px] capitalize font-[500] `
              )}
            >
              About us.
            </h1>
            <Breadcrumb>
              <BreadcrumbList
                className={cn(
                  `${raleway.className} font-[400] text-[12px] text-[whitesmoke]`
                )}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="https://www.rofad91globalservicesltd.com/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    About us
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>
      <section className="w-full pt-20">
        <div className="container w-full md:w-[1100px] mx-auto h-fit pb-10 text-center">
          <h1
            className={cn(
              `${open_sans.className} font-[500] text-[20px] md:text-[40px] leading-[1em]`
            )}
          >
            We&apos;re dedicated to make your travel experience as simple and
            stress free as possible.
          </h1>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5 my-10 md:my-20 text-left">
            <div className="bg-pink-100 p-5 space-y-2 rounded-[5px] text-justify md:text-left">
              <h1 className={cn(`${syne.className} font-[600] text-[18px]`)}>
                Company Overview
              </h1>
              <p className="text-sm">
                Rofad91 Logistics Services is a premier car hire company in
                Nigeria, renowned for its commitment to delivering exceptional
                transportation solutions. Our extensive fleet includes luxury
                sedans, SUVs, and spacious buses, all meticulously maintained
                and equipped with modern amenities to meet diverse client needs.
              </p>
            </div>
            <div className="bg-indigo-100 p-5 space-y-2 rounded-[5px] text-justify md:text-left">
              <h1 className={cn(`${syne.className} font-[600] text-[18px]`)}>
                Commitment to Excellence
              </h1>
              <p className="text-sm">
                At Rofad91 Logistics Services, we are committed to excellence in
                every aspect of our service. Our vehicles are regularly serviced
                and maintained to ensure reliability and comfort. We strive to
                exceed client expectations by providing personalized and
                professional transportation services.
              </p>
            </div>
            <div className="bg-violet-100 p-5 space-y-2 rounded-[5px] text-justify md:text-left">
              <h1 className={cn(`${syne.className} font-[600] text-[18px]`)}>
                Vision Statement
              </h1>
              <p className="text-sm">
                To be the leading provider of premium car hire services in
                Nigeria, recognized for our unwavering commitment to safety,
                comfort, and excellence. We aspire to set the standard in the
                transportation industry by continually innovating and enhancing
                our services to meet the evolving needs of our clients.
              </p>
            </div>
            <div className="bg-pink-100 p-5 space-y-2 rounded-[5px] text-justify md:text-left">
              <h1 className={cn(`${syne.className} font-[600] text-[18px]`)}>
                Mission Statement
              </h1>
              <p className="text-sm">
                At Rofad91 Logistics Services, our mission is to deliver
                exceptional transportation solutions that prioritize safety,
                comfort, and punctuality. We are dedicated to maintaining a
                fleet of well-maintained, modern vehicles and employing
                professional chauffeurs who share our commitment to excellence.
                Through personalized service and a relentless focus on client
                satisfaction, we aim to make every journey a seamless and
                enjoyable experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex bg-[url('/images/page-img.jpg')] bg-cover pt-[10px] md:pt-[80px] pb-10 bg-fixed bg-right-top relative">
        <span className="bg-[#20262f] absolute top-0 bottom-0 w-full inline-block h-full opacity-0 "></span>
        <div className="container mx-auto flex text-white z-10 md:w-[80%] w-full">
          <div className="flex items-center gap-5 flex-col md:flex-row  justify-center text-center w-full pt-10 md:pt-0">
            <h1 className={cn(`${syne.className} font-[400] md:text-[24px]`)}>
              Call Today For Booking Your Next Ride
            </h1>
            <Phone size={40} />
            <h1
              className={cn(
                `${syne.className} font-[600] md:text-[34px] text-[20px]`
              )}
            >
              (+234) 803 820 6971
            </h1>
            <h1 className={cn(`${syne.className} font-[400] md:text-[24px]`)}>
              Operators available 24/7
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
