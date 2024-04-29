import Image from "next/image";
import Hero from "./_component/Hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { open_sans, syne } from "@/lib/fonts";
import {
  AtSign,
  ChevronRight,
  CreditCard,
  Headset,
  MapPinned,
  Search,
} from "lucide-react";
import { CarCarousa } from "./_component/carousel/carCard";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Hero />
        <section className="w-full">
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
        </section>
        <section className="w-full py-20">
          <div className="container w-full md:w-[1100px] mx-auto  h-fit pb-10 ">
            <div className="w-full justify-center flex flex-col text-center">
              <h1
                className={cn(
                  `${syne.className} font-[600] text-[15px] md:text-[30px] mt-4 uppercase`
                )}
              >
                OUR PREMIUM BRANDS
              </h1>
              <p className={cn(`${syne.className} text-sm`)}>
                Luxury Rental Services
              </p>
              <div className="w-full grid md:grid-cols-5 grid-cols-2 gap-5 my-8">
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
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, omnis.
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
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, omnis.
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
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, omnis.
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
