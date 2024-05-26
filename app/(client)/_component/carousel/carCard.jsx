"use client";
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
import { barlow, montserrat } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { truncateText } from "@/utils/trucateText";
import Link from "next/link";
import SkeletonLoader from "../Loader";

export function CarCarousa() {
  const { data, loading } = useFetch("/car");
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full  mx-auto z-30"
    >
      <CarouselContent>
        {loading ? (
          <SkeletonLoader />
        ) : (
          data?.map((car) => (
            <CarouselItem
              className="flex justify-center md:basis-1/2 lg:basis-1/4 outline-none border-0 cursor-move carousel-item transition-all delay-75"
              key={car.id}
            >
              <div className="bg-white flex flex-col w-[300px] justify-center text-center items-center">
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
                      {car?.features?.split(",")?.map((feature, i) => (
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
                    <Link href={`/cars/${car?.id}`}>
                      <Button className="bg-transparent border border-[#000] uppercase text-sm w-full md:w-fit">
                        rent it
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
