import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { barlow, syne } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export function CarCarousa() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full  mx-auto z-30"
    >
      <CarouselContent>
        <CarouselItem className="flex justify-center md:basis-1/2 lg:basis-1/4 outline-none border-0 cursor-move carousel-item transition-all delay-75">
          <div className="bg-white flex flex-col w-[300px] justify-center text-center items-center">
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
                  className={cn(`${barlow.className} font-[600] text-[20px]`)}
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
                <h1 className={cn(`${syne.className} font-[600] text-[20px]`)}>
                  N10,000/day
                </h1>
                <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                  rent it
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="flex justify-center md:basis-1/2 lg:basis-1/4 outline-none border-0 cursor-move carousel-item transition-all delay-75">
          <div className="bg-white flex flex-col w-[300px] justify-center text-center items-center">
            <Image
              src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/18054365085a8e60bba5141338689408_0_0.jpg"
              width={250}
              height={100}
              alt="ford"
              className="object-cover w-full h-[150px] "
            />
            <div className="w-full p-3 bg-[whitesmoke]">
              <div className="flex justify-center text-center flex-col">
                <h1
                  className={cn(`${barlow.className} font-[600] text-[20px]`)}
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
        </CarouselItem>
        <CarouselItem className="flex justify-center md:basis-1/2 lg:basis-1/4 outline-none border-0 cursor-move carousel-item transition-all delay-75">
          <div className="bg-white flex flex-col w-[300px] justify-center text-center items-center">
            <Image
              src="https://autostar.pro-theme.info/wp-content/uploads/2018/10/001-1.jpg"
              width={250}
              height={100}
              alt="ford"
              className="object-cover w-full h-[150px] "
            />
            <div className="w-full p-3 bg-[whitesmoke]">
              <div className="flex justify-center text-center flex-col">
                <h1
                  className={cn(`${barlow.className} font-[600] text-[20px]`)}
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
        </CarouselItem>
        <CarouselItem className="flex justify-center md:basis-1/2 lg:basis-1/4 outline-none border-0 cursor-move carousel-item transition-all delay-75">
          <div className="bg-white flex flex-col w-[300px] justify-center text-center items-center">
            <Image
              src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/2683357056f0ab41abef6173064588_0_0.jpg"
              width={250}
              height={100}
              alt="ford"
              className="object-cover w-full h-[150px] "
            />
            <div className="w-full p-3 bg-[whitesmoke]">
              <div className="flex justify-center text-center flex-col">
                <h1
                  className={cn(`${barlow.className} font-[600] text-[20px]`)}
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
        </CarouselItem>
        <CarouselItem className="flex justify-center md:basis-1/2 lg:basis-1/4 outline-none border-0 cursor-move carousel-item transition-all delay-75">
          <div className="bg-white flex flex-col w-[300px] justify-center text-center items-center">
            <Image
              src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/59989409858c9edbf44f34825366106_0_0.jpg"
              width={250}
              height={100}
              alt="ford"
              className="object-cover w-full h-[150px] "
            />
            <div className="w-full p-3 bg-[whitesmoke]">
              <div className="flex justify-center text-center flex-col">
                <h1
                  className={cn(`${barlow.className} font-[600] text-[20px]`)}
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
        </CarouselItem>
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
