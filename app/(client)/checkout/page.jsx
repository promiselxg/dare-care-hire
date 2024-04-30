import { CornerDownLeft, Home } from "lucide-react";
import "./checkout.css";
import "../cart/cart.css";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CheckoutPage = () => {
  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex justify-between items-center border border-[#eee] ">
          <div className="border-r-[1px] border-[#eee] h-[90px] flex items-center px-10">
            <Link href="/cart">
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
      <section className="w-full ">
        <div className="mx-auto w-full md:w-[80%]  h-fit flex gap-5 flex-col md:flex-row">
          <div className="w-full md:w-[50%]  border-r-[1px] border-[#eee]">
            <div
              className={cn(
                `${raleway.className} px-5 py-20 flex flex-col gap-y-3`
              )}
            >
              <div className="w-full flex gap-3 flex-col md:flex-row">
                <div className="flex flex-col w-full gap-y-2">
                  <label
                    htmlFor="first_name"
                    className={cn(`${raleway.className} font-[600]`)}
                  >
                    First Name
                  </label>
                  <input type="text" name="first_name" id="" className="p-2" />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                  <label
                    htmlFor="first_name"
                    className={cn(`${raleway.className} font-[600]`)}
                  >
                    First Name
                  </label>
                  <input type="text" name="first_name" id="" className="p-2" />
                </div>
              </div>
              <div className="w-full flex gap-3">
                <div className="flex flex-col w-full gap-y-2">
                  <label
                    htmlFor="first_name"
                    className={cn(`${raleway.className} font-[600]`)}
                  >
                    Phone
                  </label>
                  <input type="text" name="first_name" id="" className="p-2" />
                </div>
              </div>
              <div className="w-full flex gap-3">
                <div className="flex flex-col w-full gap-y-2">
                  <label
                    htmlFor="first_name"
                    className={cn(`${raleway.className} font-[600]`)}
                  >
                    Email Address
                  </label>
                  <input type="text" name="first_name" id="" className="p-2" />
                </div>
              </div>
              <div className="w-full flex gap-3">
                <div className="flex flex-col w-full gap-y-2">
                  <label
                    htmlFor="first_name"
                    className={cn(`${raleway.className} font-[600]`)}
                  >
                    Order notes (optional)
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    className="p-2"
                    placeholder="notes about your order eg.special order for delivery"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[93%] mx-auto md:mx-0 md:w-[50%] pt-0 pb-20 md:py-20">
            <div className="w-full">
              <table
                className={cn(
                  `${raleway.className} w-full shop_table overflow-x-scroll md:overflow-x-auto`
                )}
              >
                <thead>
                  <tr>
                    <th className="text-left flex">PRODUCT</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="product_name w-[85%]">
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
                            <span>Additional Driver</span>-
                            <span>&#8358;35</span>
                          </p>
                          <p className="flex gap-3  text-[12px] capitalize">
                            <span>Child seat</span>-<span>&#8358;35</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="w-[15%] text-[#da1c36] font-[600]">
                      &#8358;10,000
                    </td>
                  </tr>
                  <tr>
                    <th className="text-lefth flex uppercase">SUBTOTAL</th>
                    <td className="font-[600]">&#8358;10,000</td>
                  </tr>
                  <tr>
                    <th className="text-lefth flex uppercase ">TOTAL</th>
                    <td className="font-[600]">&#8358;10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full bg-[#eeeeee] p-10">
              <div className="border-b-[1px] border-[#ccc] py-3">
                <p className={cn(`${raleway.className} text-sm`)}>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </div>
              <h1
                className={cn(`${raleway.className} font-[600] uppercase py-2`)}
              >
                Pay with
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <a href="">
                  <Image
                    src="/images/paystack.svg"
                    width={150}
                    height={30}
                    alt="paystack"
                  />
                </a>
                <span
                  className={cn(`${raleway.className} uppercase font-[600]`)}
                >
                  Or
                </span>
                <a href="">
                  <Image
                    src="/images/flutterwave.svg"
                    width={150}
                    height={30}
                    alt="flutterwave"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
