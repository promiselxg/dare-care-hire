import Image from "next/image";
import Header from "./_component/Header";
import Hero from "./_component/Hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { montserrat, open_sans, syne } from "@/lib/fonts";
import { ChevronRight, CreditCard, MapPinned, Search } from "lucide-react";
import { CarCarousa } from "./_component/carousel/carCard";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Header />
        <Hero />
        <section className="w-full ">
          <div
            className="w-[80%] py-[40px] px-[30px] bg-white mx-auto h-[400px] -mt-[200px] relative mb-10 z-10"
            style={{
              boxShadow:
                "0px 0px 10px 0px rgba(207.39999999999998, 193.42304347826087, 193.42304347826087, 0.5)",
            }}
          >
            <div className="w-full grid grid-cols-3 gap-4">
              <div className="">
                <Image
                  src="/images/1.jpg"
                  width={500}
                  height={100}
                  className="w-full object-cover h-[250px]"
                  alt="image"
                />
                <h1
                  className={cn(
                    `${montserrat.className} text-[20px] font-[500] my-2`
                  )}
                >
                  Airport and port transfers .
                </h1>
                <Button
                  className={cn(
                    `${syne.className} bg-[--button-bg] font-[500] hover:scale-[1.1] hover:bg-[--button-bg] rounded-[5px] py-5 px-8 text-white transition-all delay-75`
                  )}
                >
                  Book Now
                </Button>
              </div>
              <div className="">
                <Image
                  src="/images/2.jpg"
                  width={500}
                  height={100}
                  className="w-full object-cover h-[250px]"
                  alt="image"
                />
                <h1
                  className={cn(
                    `${montserrat.className} text-[20px] font-[500] my-2`
                  )}
                >
                  Airport and port transfers .
                </h1>
                <Button
                  className={cn(
                    `${syne.className} bg-[--button-bg] font-[500] hover:scale-[1.1] hover:bg-[--button-bg] rounded-[5px] py-5 px-8 text-white transition-all delay-75`
                  )}
                >
                  Book Now
                </Button>
              </div>
              <div className="">
                <Image
                  src="/images/3.jpg"
                  width={500}
                  height={100}
                  className="w-full object-cover h-[250px]"
                  alt="image"
                />
                <h1
                  className={cn(
                    `${montserrat.className} text-[20px] font-[500] my-2`
                  )}
                >
                  Airport and port transfers .
                </h1>
                <Button
                  className={cn(
                    `${syne.className} bg-[--button-bg] font-[500] hover:scale-[1.1] hover:bg-[--button-bg] rounded-[5px] py-5 px-8 text-white transition-all delay-75`
                  )}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20">
          <div className="container w-[1100px] mx-auto  h-fit pb-10 ">
            <div className="w-full justify-center flex flex-col text-center">
              <h1
                className={cn(
                  `${syne.className} font-[600] text-[30px] mt-4 uppercase`
                )}
              >
                OUR PREMIUM BRANDS
              </h1>
              <p className={cn(`${syne.className} text-sm`)}>
                Luxury Rental Services
              </p>
              <div className="w-full grid grid-cols-5 gap-5 my-8">
                <div className="border border-[rgba(0,0,0,0.1)] p-5 rounded-[4px] hover:cursor-pointer imageBtn">
                  <Image
                    src="/images/audi.jpg"
                    width={200}
                    height={100}
                    alt="audi"
                  />
                </div>
                <div className="border border-[rgba(0,0,0,0.1)] p-5 rounded-[4px] hover:cursor-pointer imageBtn">
                  <Image
                    src="/images/bmw.jpg"
                    width={200}
                    height={100}
                    alt="audi"
                  />
                </div>
                <div className="border border-[rgba(0,0,0,0.1)] p-5 rounded-[4px] hover:cursor-pointer imageBtn">
                  <Image
                    src="/images/ferrari.jpg"
                    width={200}
                    height={100}
                    alt="audi"
                  />
                </div>
                <div className="border border-[rgba(0,0,0,0.1)] p-5 rounded-[4px] hover:cursor-pointer imageBtn">
                  <Image
                    src="/images/pegeout.jpg"
                    width={230}
                    height={100}
                    alt="audi"
                  />
                </div>
                <div className="border border-[rgba(0,0,0,0.1)] p-5 rounded-[4px] hover:cursor-pointer imageBtn">
                  <Image
                    src="/images/ford.jpg"
                    width={230}
                    height={100}
                    alt="audi"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full h-[500px] bg-how-it-works flex items-center bg-no-repeat bg-cover bg-center relative"
          style={{ padding: "100px 0px 140px 0px" }}
        >
          <div className="w-full absolute top-0 bottom-0 bg-[rgba(0,0,0,0.75)] transition-all delay-75"></div>
          <div className="container mx-auto flex items-center justify-center z-10 flex-col gap-y-5">
            <h1
              className={cn(
                `${syne.className} text-white flex text-center my-5 text-[40px] leading-[1] uppercase`
              )}
            >
              HOW DOES
              <br />
              RENTAL WORKS.
            </h1>
            <div className="w-full grid grid-cols-3 gap-5">
              <div className=" text-[whitesmoke] w-[380px]  flex items-center gap-5">
                <Search size={100} />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Find a car
                  </h1>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, omnis.
                  </p>
                </div>
                <ChevronRight size={80} />
              </div>
              <div className=" text-[whitesmoke]  w-[380px] flex items-center gap-5">
                <MapPinned size={100} />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Select location
                  </h1>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, omnis.
                  </p>
                </div>
                <ChevronRight size={80} />
              </div>
              <div className=" text-[whitesmoke] w-[380px] flex items-center gap-5">
                <CreditCard size={80} />
                <div>
                  <h1
                    className={cn(
                      `${open_sans.className} text-[20px] font-[600] my-1`
                    )}
                  >
                    Place your order
                  </h1>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, omnis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  */}
        <section className="w-full py-10 h-fit items-center flex">
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
      </div>
    </>
  );
}
