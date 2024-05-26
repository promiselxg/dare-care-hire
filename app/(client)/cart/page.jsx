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
import { useEffect, useMemo } from "react";
import { useCart } from "@/context/cartContext";
import { formatDateTime } from "@/utils/getDateDifference";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const CartPage = () => {
  const { isloading, cart, removeItemFromCart } = useCart();

  const subtotal = useMemo(
    () => cart?.reduce((acc, current) => acc + current.subtotal, 0),
    [cart]
  );

  const extraResourcesTotal = useMemo(
    () =>
      cart.reduce((acc, current) => {
        const extraResources = current.extra_resource;
        const total = Object.values(extraResources).reduce(
          (acc, value) => acc + parseInt(value || 0),
          0
        );
        return acc + total;
      }, 0),
    [cart]
  );

  const subTotalWithExtraResource = useMemo(
    () =>
      cart.map((item) => {
        const extraResourcesTotal = item.extra_resource
          ? Object.values(item.extra_resource).reduce(
              (acc, value) => acc + parseInt(value || 0),
              0
            )
          : 0;
        return { ...item, subtotal: item.subtotal + extraResourcesTotal };
      }),
    [cart]
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {isloading ? (
        <div className="fixed top-0 bottom-0 w-full bg-[rgba(0,0,0,.8)] z-[999] h-screen overflow-hidden text-white flex items-center justify-center flex-col gap-y-2">
          <Loader2 className="animate-spin" size={50} />
          loading...
        </div>
      ) : (
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
                      <BreadcrumbLink href="/cars">Car Listing</BreadcrumbLink>
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
                    <th>DAY(s)</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {subTotalWithExtraResource &&
                    subTotalWithExtraResource?.map((item) => {
                      const showExtraResources =
                        item?.extra_resource?.police_escort ||
                        item?.extra_resource?.child_seat;
                      return (
                        <tr key={item.id}>
                          <td
                            className="w-[5%] cursor-pointer"
                            onClick={() => removeItemFromCart(item.id)}
                          >
                            X
                          </td>
                          <td className="w-[15%]">
                            <Link
                              href={`/cars/${item.id}`}
                              className="cursor-pointer"
                            >
                              <Image
                                src={item?.imgUrl}
                                width={200}
                                height={50}
                                alt="img"
                              />
                            </Link>
                          </td>
                          <td className="product_name w-[35%]">
                            <h1 className="flex text-left capitalize font-[600]">
                              {item?.vehicle_name}
                            </h1>
                            <div className="pl-[20px] pt-[10px]">
                              <div className="start-booking-pickup flex text-left flex-col min-h-[90px] relative">
                                <span className="start-booking-date  font-[600]">
                                  Pickup
                                </span>
                                <span className="value">
                                  {formatDateTime(item?.rideInfo?.pickup_date)}
                                </span>
                                <span className="location-value capitalize">
                                  {item?.rideInfo?.pickup_location}
                                </span>
                              </div>
                              <div className="flex text-left flex-col relative">
                                <span className="end-booking-date font-[600]">
                                  Drop Off
                                </span>
                                <span className="value">
                                  {formatDateTime(item?.rideInfo?.dropoff_date)}
                                </span>
                                <span className="location-value capitalize">
                                  {item?.rideInfo?.dropoff_location}
                                </span>
                              </div>

                              {item?.extra_resource && (
                                <div className="w-full inline-block text-left my-5">
                                  {showExtraResources ? (
                                    <h1
                                      key={item.id}
                                      className={cn(
                                        `${raleway.className} font-[600] text-sm`
                                      )}
                                    >
                                      Extra Resources
                                    </h1>
                                  ) : null}
                                  {item?.extra_resource?.police_escort && (
                                    <div className="flex gap-3  text-[12px]  capitalize">
                                      <span>Police Escort</span>-
                                      <span className="font-bold">
                                        &#8358;
                                        {new Intl.NumberFormat().format(
                                          item?.extra_resource?.police_escort
                                        )}
                                      </span>
                                    </div>
                                  )}

                                  {item?.extra_resource?.child_seat && (
                                    <div className="flex gap-3  text-[12px] capitalize">
                                      <span>Child seat</span>-
                                      <span className="font-bold">
                                        &#8358;
                                        {new Intl.NumberFormat().format(
                                          item?.extra_resource?.child_seat
                                        )}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="w-[15%] text-[#da1c36] font-[600]">
                            &#8358;
                            {new Intl.NumberFormat().format(item?.amount)}
                          </td>
                          <td className="w-[15%] ">{item?.days}&nbsp;day(s)</td>
                          <td className="w-[15%] text-[#da1c36] font-[600]">
                            &#8358;
                            {new Intl.NumberFormat().format(item?.subtotal)}
                          </td>
                        </tr>
                      );
                    })}
                  {!cart ||
                    (cart?.length < 1 && (
                      <tr>
                        <td
                          colSpan="6"
                          style={{ padding: "40px 0" }}
                          className={cn(
                            `${raleway.className} uppercase font-[600]`
                          )}
                        >
                          your cart is empty
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div>
                {cart?.length > 0 && (
                  <div className="w-full md:w-1/2 mb-[70px] border border-[#ebe9eb] float-right p-[30px]">
                    <h1
                      className={cn(
                        `${raleway.className} mb-2 uppercase font-[600]`
                      )}
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
                        {formatCurrency(subtotal + extraResourcesTotal)}
                      </span>
                    </div>
                    <div className="w-full my-5">
                      <Link href="/checkout">
                        <Button
                          className={cn(
                            `${raleway.className} w-full bg-[--button-bg] font-[500] hover:opacity-[.8] hover:bg-[--button-bg] rounded-[5px] py-6 px-8 text-white transition-all delay-75 uppercase`
                          )}
                        >
                          proceed to checkout
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CartPage;
