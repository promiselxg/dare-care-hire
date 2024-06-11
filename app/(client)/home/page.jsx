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
        {/* <section className="w-full">
          <div
            className="w-[80%] py-[40px] px-[30px] bg-white mx-auto h-fit -mt-[50px] relative mb-10 z-10 flex gap-3 items-center flex-col md:flex-row"
            style={{
              boxShadow:
                "0px 0px 10px 0px rgba(207.39999999999998, 193.42304347826087, 193.42304347826087, 0.5)",
            }}
          >
            <div className="flex flex-col">
              <label htmlFor="">Pick up date</label>
              <input
                type="datetime-local"
                name=""
                id=""
                className="w-full p-2 h-[43px] bg-white outline-none border border-[--primary-text-color] rounded-[5px]  text-[--primary-bg] font-[500]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Pick up date</label>
              <input
                type="datetime-local"
                name=""
                id=""
                className="w-full p-2 h-[43px] bg-white outline-none border border-[--primary-text-color] rounded-[5px]  text-[--primary-bg] font-[500]"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Car Type</label>
              <select
                name=""
                id=""
                className="w-full md:w-[200px] h-[43px] p-2 bg-white outline-none border border-[--primary-text-color] rounded-[5px]  text-[--primary-bg] font-[500]"
              >
                <option value="">Toyota</option>
                <option value="">Mercedize Benz</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">Destination</label>
              <select
                name=""
                id=""
                className="w-full md:w-[200px] h-[43px] p-2 bg-white outline-none border border-[--primary-text-color] rounded-[5px]  text-[--primary-bg] font-[500]"
              >
                <option value="">Within FCT</option>
                <option value="">Outside FCT</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="">&nbsp;</label>
              <Button
                className={cn(
                  `${syne.className} w-full bg-[--button-bg] font-[500] hover:scale-[1.1] hover:bg-[--button-bg] rounded-[5px] py-5 px-8 text-white transition-all delay-75`
                )}
              >
                Book Now
              </Button>
            </div>
          </div>
        </section> */}
        <section className="w-full pt-20">
          <div className="container w-full md:w-[1100px] mx-auto h-fit pb-10">
            <h1
              className={cn(
                `${barlow.className} font-[600] text-[15px] md:text-[30px] uppercase text-center mb-8`
              )}
            >
              What We Do
            </h1>
            <h1>
              <b>Rofad91 logistic services ltd</b> guarantees a punctual and
              luxurious transportation experience. Our seasoned staff provides
              tailored support to elevate any celebration or corporate event.
              Enjoy the assurance of a pristine, picture-perfect vehicle
              awaiting you for special occasions and corporate ground
              transportation needs.
            </h1>
          </div>
        </section>
        <section className="w-full my-10 md:w-[1100px] mx-auto">
          <div className="container w-full pb-10">
            <h1
              className={cn(
                `${barlow.className} font-[600] text-[15px] md:text-[30px] uppercase text-center mb-8`
              )}
            >
              Our Services
            </h1>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <div className="p-10 bg-[whitesmoke]">
                <h1
                  className={cn(
                    `${montserrat.className} font-[600] text-[15px] md:text-[18px] capitalize`
                  )}
                >
                  Airport Pick-up/Drop-off
                </h1>
                <p className="text-[14px]">
                  We provide pick up and drop off and shuttle service to and
                  from all major local airports in surrounding areas in one of
                  our comfortable luxury sedans. We can assist you with airport
                  transfers for stress-free travel and take you to all your
                  desired destinations.
                </p>
              </div>
              <div className="p-10 bg-[whitesmoke]">
                <h1
                  className={cn(
                    `${montserrat.className} font-[600] text-[15px] md:text-[18px] capitalize`
                  )}
                >
                  Inter-state Travels
                </h1>
                <p className="text-[14px]">
                  We provide pick up and drop off and shuttle service to and
                  from all major local airports in surrounding areas in one of
                  our comfortable luxury sedans. We can assist you with airport
                  transfers for stress-free travel and take you to all your
                  desired destinations.
                </p>
              </div>
              <div className="p-10 bg-[whitesmoke]">
                <h1
                  className={cn(
                    `${montserrat.className} font-[600] text-[15px] md:text-[18px] capitalize`
                  )}
                >
                  Reservations
                </h1>
                <p className="text-[14px]">
                  We also provide customized service for your special event such
                  as your wedding day, corporate, night out on the town,
                  bachelor/bachelorette party, concert, and more. We also
                  provide high-quality private car service for your business
                  meetings or corporate affairs.
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
                <Search size={100} />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Find a car
                  </h1>
                  <p className={cn(`${syne.className} text-sm`)}>
                    Discover your dream ride with our easy &apos;Find a
                    car&apos; search tool.
                  </p>
                </div>
                <ChevronRight size={80} />
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
                    Provide a ride pick-up, drop-off and pick-up and drop-off
                    time.
                  </p>
                </div>
                <ChevronRight size={80} />
              </div>
              <div className=" text-[whitesmoke] w-full md:w-[380px] flex items-center gap-5">
                <CreditCard size={80} />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Place your order
                  </h1>
                  <p className={cn(`${syne.className} text-sm`)}>
                    Use our checkout form to submit your reservation,
                    reservation is valid after payment is made.
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
                  <h1 className="-mt-2 text-sm font-bold">(258) 403 7961</h1>
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
                    info@cardealer.com
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
