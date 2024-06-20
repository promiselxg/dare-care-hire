"use client";
import "../../cart/cart.css";
import { montserrat, open_sans, raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CornerDownLeft, Home, Loader2 } from "lucide-react";
import {
  formatDateTime,
  formatDateWithoutTime,
} from "@/utils/getDateDifference";
import { formatCurrency } from "@/utils/formatCurrency";
import axios from "axios";
import { redirect } from "next/navigation";

const SuccessfullOrderPage = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  if (data?.message === "No Record found with the ID Provided") {
    redirect("/cars");
  }
  const subtotal = data?.reduce(
    (acc, current) => acc + current.transaction_amount,
    0
  );
  useEffect(() => {
    const checkTransactionID = () => {
      if (!params.orderid || params.orderid === "") {
        window.location = "/cars";
      }
    };
    checkTransactionID();
  }, [params.orderid, data?.length]);

  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true);
      const response = await axios.get(`/api/checkout/${params?.orderid}`, {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*", // Allow all origins
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allow methods
          "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers
        },
      });
      setData(response.data);
      setLoading(false);
    };
    getTransaction();
  }, [params?.orderid]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      {loading ? (
        <div className="fixed top-0 bottom-0 w-full bg-[rgba(0,0,0,.8)] z-[999] h-screen overflow-hidden text-white flex items-center justify-center flex-col gap-y-2">
          <Loader2 className="animate-spin" size={50} />
          loading...
        </div>
      ) : (
        <>
          <div className="w-full flex">
            <div className="w-full flex justify-between items-center border border-[#eee] ">
              <div className="border-r-[1px] border-[#eee] h-[90px] flex items-center px-10">
                <Link href="/cars">
                  <CornerDownLeft size={40} />
                </Link>
              </div>
              <div className="border-l-[1px] border-[#eee] h-[90px] flex items-center px-10">
                <Link href="/home">
                  <Home size={40} />
                </Link>
              </div>
            </div>
          </div>
          <section className="w-full flex h-fit overflow-x-scroll md:overflow-x-hidden">
            <div className="md:container w-full md:w-[80%] flex mx-auto pt-10 px-5 md:px-0 flex-col ">
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-2 items-center leading-relaxed">
                  <span className={cn(`${raleway.className} uppercase`)}>
                    order number:
                  </span>
                  <span className={cn(`${open_sans.className} font-[600]`)}>
                    {params?.orderid}
                  </span>
                </div>
                <div className="flex gap-2 items-center leading-relaxed">
                  <span className={cn(`${raleway.className} uppercase`)}>
                    Date:
                  </span>
                  <span className={cn(`${raleway.className} font-[600]`)}>
                    {formatDateWithoutTime(data[0]?.createdAt)}
                  </span>
                </div>
                <div className="flex gap-2 items-center leading-relaxed">
                  <span className={cn(`${raleway.className} uppercase`)}>
                    Total:
                  </span>
                  <span className={cn(`${open_sans.className} font-[600]`)}>
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex gap-2 items-center leading-relaxed">
                  <span className={cn(`${raleway.className} uppercase`)}>
                    Payment method:
                  </span>
                  <span className={cn(`${raleway.className} font-[600]`)}>
                    Pay on delivery
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
                    {data?.map((item) => {
                      return (
                        <>
                          <tr key={item?.id}>
                            <td className="product_name w-[75%]">
                              <h1
                                className={cn(
                                  `${raleway.className} flex text-left font-[600] uppercase`
                                )}
                              >
                                {item?.vehicle_info?.vehicle_name}
                              </h1>
                              <div className="pl-[20px] pt-[10px]">
                                <div className="start-booking-pickup flex text-left flex-col min-h-[90px] relative">
                                  <span className="start-booking-date  font-[600]">
                                    Pickup
                                  </span>
                                  <span className="value underline">
                                    {formatDateTime(item?.pickup_date)}
                                  </span>
                                  <span className="location-value font-bold">
                                    {item?.pickup_location}
                                  </span>
                                </div>
                                <div className="flex text-left flex-col relative">
                                  <span className="end-booking-date font-[600]">
                                    Drop Off
                                  </span>
                                  <span className="value underline">
                                    {formatDateTime(item?.dropoff_date)}
                                  </span>
                                  <span className="location-value font-bold">
                                    {item?.dropoff_location}
                                  </span>
                                </div>
                                {item?.extra_resources && (
                                  <div className="w-full inline-block text-left my-5">
                                    <h1
                                      key={item.id}
                                      className={cn(
                                        `${raleway.className} font-[600] text-sm`
                                      )}
                                    >
                                      Extra Resources
                                    </h1>
                                    {Object.entries(
                                      item?.extra_resources || {}
                                    ).map(([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex gap-3 text-[12px] capitalize"
                                      >
                                        <span className="uppercase">
                                          {key.replace(/_/g, " ")}
                                        </span>{" "}
                                        -
                                        <span className="font-bold">
                                          &#8358;
                                          {new Intl.NumberFormat().format(
                                            value
                                          )}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td
                              className={`${montserrat.className} w-[25%] text-[#da1c36] font-[600]`}
                            >
                              {formatCurrency(item?.transaction_amount)}
                            </td>
                          </tr>
                          {item?.order_note !== "" && (
                            <tr>
                              <td colSpan={2}>
                                <b>Order Note: </b>
                                {item?.order_note}
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}

                    <tr>
                      <th className="text-left flex uppercase bg-[#f6f6f6] font-bold">
                        total amount to pay
                      </th>
                      <td className={cn(`${open_sans.className} font-bold`)}>
                        {formatCurrency(subtotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SuccessfullOrderPage;
