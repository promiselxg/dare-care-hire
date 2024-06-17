"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { barlow, montserrat, open_sans, syne } from "@/lib/fonts";
import {
  AtSign,
  ChevronRight,
  CreditCard,
  Headset,
  MapPinned,
  Search,
} from "lucide-react";

import Hero from "../_component/Hero";
import { CarCarousa } from "../_component/carousel/carCard";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="w-full">
        <Hero />

        <section className="w-full pt-20">
          <div className="container w-full md:w-[1100px] mx-auto h-fit pb-10 text-center">
            <h1
              className={cn(
                `${syne.className} font-[600] text-[15px] md:text-[30px] text-center`
              )}
            >
              What We Do
            </h1>
            <div className="text-[16px] text-[#333]">
              At <b>ROFAD91</b>, we offer a comprehensive range of
              transportation solutions designed to meet your needs:
              <ul>
                <li>
                  - Airport pick-up and drop-off with standard cars, SUVs, and
                  spacious buses
                </li>
                <li> - Point-to-point car hire services</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="w-full py-20">
          <div className="container w-full md:w-[1100px] mx-auto h-fit pb-10 text-center">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <div className="p-10 bg-red-200 h-fit text-center flex flex-col justify-center w-full items-center space-y-5">
                <Image
                  src="/images/thumbs.svg"
                  alt="thumbs"
                  width={50}
                  height={50}
                />
                <h1
                  className={cn(
                    `${montserrat.className} font-[600] text-[15px] md:text-[18px] capitalize text-center`
                  )}
                >
                  Airport Pick-up/Drop-off.
                </h1>

                <p className="text-[14px] text-justify">
                  Do you have a flight to catch, or an appointment to meet, do
                  you want someone to help you pick-up or drop-off someone at
                  the airport? at <b>Rofad91 logistics</b>, we offer Airport
                  Pick-up and Drop-off.
                </p>
              </div>
              <div className="p-10 bg-fuchsia-200 h-fit text-center flex flex-col justify-center w-full items-center space-y-5">
                <Image
                  src="/images/feedback.svg"
                  alt="thumbs"
                  width={50}
                  height={50}
                />
                <h1
                  className={cn(
                    `${montserrat.className} font-[600] text-[15px] md:text-[18px] capitalize text-center mb-2`
                  )}
                >
                  Inter-state Travels within Nigeria.
                </h1>
                <p className="text-[14px] text-justify">
                  Are you planning a weekend gateway or a cross-country
                  adventure,with our well-maintained vehicles and experienced
                  drivers, we are ready to take you wherever you wish to visit
                  within the country. we make inter-state travels within Nigeria
                  easy, enjoyable,affordable, convenient and stress-free.{" "}
                  <Link
                    href="https://www.rofad91globalservicesltd.com/cars"
                    className="text-red-400 font-bold"
                  >
                    Book a ride with us.
                  </Link>
                </p>
              </div>
              <div className="p-10 bg-blue-200 h-fit text-center flex flex-col justify-center w-full items-center space-y-5">
                <Image
                  src="/images/map.svg"
                  alt="thumbs"
                  width={50}
                  height={50}
                />
                <h1
                  className={cn(
                    `${montserrat.className} font-[600] text-[15px] md:text-[18px] capitalize text-center mb-2`
                  )}
                >
                  Executive Car Hire.
                </h1>
                <p className="text-[14px] text-justify">
                  Rofad global services ltd executive car rentals are tailored
                  to exceed the expectations of our professionals and corporate
                  clients. Our{" "}
                  <Link
                    href="https://www.rofad91globalservicesltd.com/cars"
                    className="text-red-400 font-bold"
                  >
                    fleets
                  </Link>{" "}
                  boast of luxurious vehicles, with our experienced drivers and
                  well maintained vehicles, we always ensure that every
                  executive travel needs are met with unparalled efficiency and
                  excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full h-fit md:h-[500px] bg-how-it-works flex items-center bg-no-repeat bg-cover bg-center relative"
          style={{ padding: "100px 0px 140px 0px" }}
        >
          <div className="w-full absolute top-0 bottom-0 bg-[rgba(0,0,0,0.75)] transition-all delay-75"></div>
          <div className="container mx-auto flex items-center justify-center z-10 flex-col gap-y-5">
            <h1
              className={cn(
                `${syne.className} text-white flex text-center my-5 text-[30px] md:text-[40px] leading-[1] uppercase`
              )}
            >
              HOW IT WORKS.
            </h1>
            <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5">
              <div className=" text-[whitesmoke] w-full md:w-[380px]  flex items-center gap-5">
                <Search size={160} className="text-[500px]" />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Find a car
                  </h1>
                  <p className={cn(`${syne.className} text-sm`)}>
                    We have different range of vehicles for different occasions,
                    take your time to search through our fleets of cars to
                    discover your dream ride.
                  </p>
                </div>
              </div>
              <div className=" text-[whitesmoke]  w-full md:w-[380px] flex items-center gap-5">
                <MapPinned size={100} />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Select location
                  </h1>
                  <p className={cn(`${syne.className} text-sm`)}>
                    Provide us with a ride pick-up, drop-off and pick-up and
                    drop-off time.
                  </p>
                </div>
              </div>
              <div className=" text-[whitesmoke] w-full md:w-[380px] flex items-center gap-5">
                <CreditCard size={230} />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Place your order
                  </h1>
                  <p className={cn(`${syne.className} text-sm`)}>
                    Use our checkout form to submit your reservation, a
                    reservation ID will be generated which you can use to pick
                    up your ride.
                    <b className="text-red-400">
                      &nbsp; your reservation is valid after payment is made.
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-10 h-fit items-center flex z-20">
          <div className="container mx-auto flex flex-col">
            <h1
              className={cn(
                `${syne.className} justify-center flex text-center font-[600] text-[30px] my-5 uppercase`
              )}
            >
              OUR RENTAL FLEETS
            </h1>
            <div className="w-[80%] mx-auto md:w-full my-10">
              <CarCarousa />
            </div>
          </div>
        </section>
        <section
          className="hidden md:flex w-full bg-fleets-bg bg-left-bottom bg-no-repeat bg-cover relative"
          style={{ padding: "0px 0px 650px 0px" }}
        >
          <div className="w-full absolute bottom-0">
            <div className="w-fit text-white rounded-t-[20px] bg-[--primary-bg] mx-auto p-10 flex items-center justify-center gap-[80px]">
              <div className="flex items-center gap-5">
                <Headset size={50} />
                <span>
                  <h1
                    className={cn(`${syne.className} font-[600] text-[40px]`)}
                  >
                    Call Us For Booking
                  </h1>
                  <h1 className="-mt-2 text-sm font-bold">
                    (+234) 803 820 6971
                  </h1>
                </span>
              </div>
              <div className="flex items-center gap-5">
                <AtSign size={50} />
                <span>
                  <h1
                    className={cn(`${syne.className} font-[600] text-[40px]`)}
                  >
                    Email Support
                  </h1>
                  <h1 className="ml-1 -mt-2 text-sm font-bold">
                    enquiry@rofad91globalservicesltd.com
                  </h1>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
