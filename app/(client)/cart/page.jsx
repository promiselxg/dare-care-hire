"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import "./cart.css";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const CartPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
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
              Cart page
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
                  <BreadcrumbPage>Cart Page</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>
      <section className="w-full flex h-fit overflow-x-scroll md:overflow-x-hidden">
        <div className="md:container w-full md:w-[80%] flex mx-auto py-20 px-5 md:px-0 flex-col ">
          <table
            className={cn(
              `${raleway.className} w-full shop_table overflow-x-scroll md:overflow-x-auto`
            )}
          >
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[5%]">X</td>
                <td className="w-[15%]">
                  <Image
                    src="https://autostar.pro-theme.info/wp-content/uploads/2018/12/4494977815b9b41fc38001632250464_0_0.jpg"
                    width={200}
                    height={50}
                    alt="img"
                  />
                </td>
                <td className="product_name w-[35%]">
                  <h1 className="flex text-left">Your Auto</h1>
                  <div className="pl-[20px] pt-[10px]">
                    <div className="start-booking-pickup flex text-left flex-col min-h-[90px] relative">
                      <span className="start-booking-date  font-[600]">
                        Pickup
                      </span>
                      <span className="value">4/05/2024 20:00</span>
                      <span className="location-value">Location 01</span>
                    </div>
                    <div className="flex text-left flex-col relative">
                      <span className="end-booking-date font-[600]">
                        Drop Off
                      </span>
                      <span className="value">4/05/2024 19:00</span>
                      <span className="location-value">Location 01</span>
                    </div>
                    <div className="w-full inline-block text-left my-5">
                      <h1
                        className={cn(
                          `${raleway.className} font-[600] text-sm`
                        )}
                      >
                        Extra Resources
                      </h1>
                      <p className="flex gap-3  text-[12px]  capitalize">
                        <span>Additional Driver</span>-<span>&#8358;35</span>
                      </p>
                      <p className="flex gap-3  text-[12px] capitalize">
                        <span>Child seat</span>-<span>&#8358;35</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="w-[15%] text-[#da1c36]">&#8358;10,000</td>
                <td className="w-[15%] ">1 day(s)</td>
                <td className="w-[15%] text-[#da1c36] font-[600]">
                  &#8358;10,000
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className="w-full md:w-1/2 mb-[70px] border border-[#ebe9eb] float-right p-[30px]">
              <h1
                className={cn(`${raleway.className} mb-2 uppercase font-[600]`)}
              >
                Cart total
              </h1>
              <div className="border border-[#ebe9eb] flex  items-center gap-5">
                <span className="w-1/2 border-r-[#ebe9eb] border-r-[1px] h-10 flex items-center px-2 py-5 bg-[#f6f6f6] uppercase">
                  Total
                </span>
                <span
                  className={cn(
                    `${raleway.className} w-1/2 text-[#da1c36] font-[600]`
                  )}
                >
                  N10,000
                </span>
              </div>
              <div className="w-full my-5">
                <Button
                  className={cn(
                    `${raleway.className} w-full bg-[--button-bg] font-[500] hover:opacity-[.8] hover:bg-[--button-bg] rounded-[5px] py-6 px-8 text-white transition-all delay-75 uppercase`
                  )}
                >
                  proceed to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
