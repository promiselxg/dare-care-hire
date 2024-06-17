"use client";
import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/fonts";

const Hero = () => {
  return (
    <>
      <section className="w-full relative bg-[--secondary-bg]" id="home">
        <div className="md:h-screen h-[300px]">
          <Carousel
            autoPlay
            infiniteLoop={true}
            transitionTime={500}
            showStatus={false}
            interval={5000}
            emulateTouch
            dynamicHeight={true}
            showThumbs={false}
          >
            <div className="relative">
              <Image
                src="/images/hero_bg.jpg"
                width={1500}
                height={700}
                className="h-[300px] md:h-screen w-full object-fit"
                alt="image"
                priority
              />
              <div className="w-3/4 max-w-max flex flex-initial md:flex-col ml-[50px] bg-[rgba(0,0,0,0.5)] md:p-10 p-5 absolute md:top-[200px] top-[80px]">
                <h1
                  className={cn(
                    `${syne.className} text-sm md:text-3xl md:font-extrabold text-[#fff] z-10 leading-tight mb-4 justify-start text-left uppercase`
                  )}
                >
                  Arrive. Discover. Experience
                </h1>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero_bg_1.jpg"
                width={1500}
                height={700}
                className="h-[300px] md:h-screen w-full object-fit"
                alt="image"
                priority
              />
              <div className="w-3/4 max-w-max flex flex-initial md:flex-col ml-[50px] bg-[rgba(0,0,0,0.5)] md:p-10 p-5 absolute md:top-[200px] top-[80px]">
                <h1
                  className={cn(
                    `${syne.className} text-sm md:text-3xl md:font-extrabold text-[#fff] z-10 leading-tight mb-4 justify-start text-left uppercase`
                  )}
                >
                  Airport Pick-Up/Drop-Off.
                </h1>
              </div>
            </div>
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Hero;
