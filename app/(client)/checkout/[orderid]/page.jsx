"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import "../../cart/cart.css";
import { raleway, syne } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const SuccessfullOrderPage = ({ params }) => {
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
              Checkout Page
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
                  <BreadcrumbLink href="/checkout">
                    Chekcout Page
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Order Received</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>
      <section className="w-full flex h-fit overflow-x-scroll md:overflow-x-hidden">
        <div className="md:container w-full md:w-[80%] flex mx-auto py-20 px-5 md:px-0 flex-col ">
          <h1
            className={cn(`${raleway.className} font-[500] text-[20px] pb-2`)}
          >
            Thank you. Your order has been received.
          </h1>
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-2 items-center leading-relaxed">
              <span className={cn(`${raleway.className} uppercase`)}>
                order number:
              </span>
              <span className={cn(`${raleway.className} font-[600]`)}>
                {params?.orderid}
              </span>
            </div>
            <div className="flex gap-2 items-center leading-relaxed">
              <span className={cn(`${raleway.className} uppercase`)}>
                Date:
              </span>
              <span className={cn(`${raleway.className} font-[600]`)}>
                April 30, 2024
              </span>
            </div>
            <div className="flex gap-2 items-center leading-relaxed">
              <span className={cn(`${raleway.className} uppercase`)}>
                Total:
              </span>
              <span className={cn(`${raleway.className} font-[600]`)}>
                $630.00
              </span>
            </div>
            <div className="flex gap-2 items-center leading-relaxed">
              <span className={cn(`${raleway.className} uppercase`)}>
                Payment method:
              </span>
              <span className={cn(`${raleway.className} font-[600]`)}>
                Direct bank transfer
              </span>
            </div>
          </div>
          <div className="w-full my-5">
            <h1
              className={cn(
                `${raleway.className} uppercase font-[500] text-[20px] mb-2`
              )}
            >
              Order Details
            </h1>
            <table
              className={cn(
                `${raleway.className} w-full  overflow-x-scroll md:overflow-x-auto bg-[#f6f6f6]`
              )}
            >
              <thead>
                <tr>
                  <th className="text-left font-semibold">PRODUCT</th>
                  <th className="text-left font-semibold">TOTAL</th>
                </tr>
              </thead>
              <tbody className="bg-[white]">
                <tr>
                  <td className="product_name w-[75%]">
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
                  <td className="w-[25%] text-[#da1c36] font-[600]">
                    &#8358;10,000
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="p-5">
                      <h1
                        className={`${raleway.className} uppercase pb-1 font-[600]`}
                      >
                        Order notes
                      </h1>
                      <p
                        className={cn(`${syne.className} text-sm text-[#333]`)}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Excepturi tempora, libero laborum saepe reprehenderit
                        eveniet facilis sapiente. Qui, quaerat neque.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="text-lefth flex uppercase bg-[#f6f6f6]">
                    SUBTOTAL
                  </th>
                  <td className="font-[600]">&#8358;10,000</td>
                </tr>
                <tr>
                  <th className="text-lefth flex uppercase bg-[#f6f6f6]">
                    Payment method
                  </th>
                  <td className="font-[500]">Direct bank transfer</td>
                </tr>
                <tr>
                  <th className="text-lefth flex uppercase bg-[#f6f6f6]">
                    TOTAL
                  </th>
                  <td className="font-[600]">&#8358;10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuccessfullOrderPage;
