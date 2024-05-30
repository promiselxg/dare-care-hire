"use client";
import { CornerDownLeft, Home, Loader2 } from "lucide-react";
import "./checkout.css";
import "../cart/cart.css";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { formatDateTime } from "@/utils/getDateDifference";
import { formatCurrency } from "@/utils/formatCurrency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { __ } from "@/utils/getElementById";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  first_name: z.string().min(3, {
    message: "First Name must be at least 3 characters.",
  }),
  last_name: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  phone: z
    .string()
    .min(11, {
      message: "Phone number must be at least 11 characters.",
    })
    .max(11),
  email_address: z.string().email().optional(),
  order_notes: z.string().optional(),
  payment_method: z.enum(["on_delivery", "online"], {
    required_error: "You need to select a payment method.",
  }),
});

const CheckoutPage = () => {
  const { isloading, cart } = useCart();
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);
  const [IdAndAmountMatch, setIdAndAmountMatch] = useState();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  //  calculate the cart sub total
  const subtotal = cart.reduce((acc, current) => acc + current.subtotal, 0);
  //  get the sum of each extra resource in the array
  const extraResourcesTotal = cart.reduce((acc, current) => {
    const extraResources = current.extra_resource;
    const total = Object.values(extraResources).reduce(
      (acc, value) => acc + parseInt(value || 0),
      0
    );
    return acc + total;
  }, 0);

  //  add the value of extra resource to the corresponding subtotal
  const subTotalWithExtraResource = cart.map((item) => {
    const extraResourcesTotal = item.extra_resource
      ? Object.values(item.extra_resource).reduce(
          (acc, value) => acc + parseInt(value || 0),
          0
        )
      : 0;
    return { ...item, subtotal: item.subtotal + extraResourcesTotal };
  });

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };
  const verifyIdAndAmountMatch = (cartItems) => {
    return cartItems.every((item) => item.existsInDB && item.amountMatches);
  };

  async function onSubmit(values) {
    if (!validateInputFields(values)) {
      toast({
        variant: "destructive",
        title: "Please fill out the rquired fields.",
        description: "There was a problem with your request.",
      });
      return;
    }
    const formData = {
      values,
      subTotalWithExtraResource,
    };

    try {
      __("submitBtn").innerHTML = "Please wait...";
      __("submitBtn").disabled = true;
      const response = await axios.post("/api/checkout", formData);
      toast({ title: `${response?.data?.message}` });
      localStorage.removeItem("cart");
      window.location = `/checkout/${response?.data?.transaction_id}`;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error occured!!!",
        description:
          "An error occured while we where trying to submit your request, please try again.",
      });
    } finally {
      __("submitBtn").disabled = false;
      __("submitBtn").innerHTML = "Complete Checkout";
    }
  }

  const validateInputFields = (inputFields) => {
    return (
      inputFields.first_name &&
      inputFields.last_name &&
      inputFields.phone &&
      inputFields.payment_method
    );
  };

  useEffect(() => {
    const handleVerification = () => {
      if (IdAndAmountMatch && !verifyIdAndAmountMatch(IdAndAmountMatch)) {
        router.push("/cart");
      }
    };

    handleVerification();
  }, [IdAndAmountMatch, router]);

  useEffect(() => {
    const verifyItemIDs = async () => {
      const response = await axios.post("/api/verifyItemID", cart);
      setIdAndAmountMatch(response?.data);
    };
    verifyItemIDs();
  }, [cart]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!cart || cart.length < 1) {
      router.push("/cart");
    }
  }, [router, cart]);

  return (
    <>
      {isloading ? (
        <div className="fixed top-0 bottom-0 w-full bg-[rgba(0,0,0,.8)] z-[999] h-screen overflow-hidden text-white flex items-center justify-center flex-col gap-y-2">
          <Loader2 className="animate-spin" size={50} />
          loading...
        </div>
      ) : (
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
            <div className="mx-auto w-full md:w-[80%]  h-fit flex gap-5 flex-col-reverse md:flex-row">
              <div className="w-full md:w-[50%]  border-r-[1px] border-[#eee]">
                <div
                  className={cn(
                    `${raleway.className} px-5 pb-20 md:pt-20 flex flex-col`
                  )}
                >
                  <h1
                    className={cn(
                      `${raleway.className} font-bold uppercase pb-4`
                    )}
                  >
                    Billing Information
                  </h1>
                  <Form
                    {...form}
                    className="w-full flex gap-3 flex-col md:flex-row"
                  >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="flex flex-col md:flex-row w-full gap-2 justify-between mb-3">
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem
                              className={cn(
                                `${raleway.className} font-[600] w-full`
                              )}
                            >
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-text" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem
                              className={cn(
                                `${raleway.className} font-[600] w-full`
                              )}
                            >
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-text" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full flex gap-3  mb-3">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem
                              className={cn(
                                `${raleway.className} font-[600] w-full`
                              )}
                            >
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-text" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full flex gap-3  mb-3">
                        <FormField
                          control={form.control}
                          name="email_address"
                          render={({ field }) => (
                            <FormItem
                              className={cn(
                                `${raleway.className} font-[600] w-full`
                              )}
                            >
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-text" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full flex gap-3  mb-3">
                        <FormField
                          control={form.control}
                          name="order_notes"
                          render={({ field }) => (
                            <FormItem
                              className={cn(
                                `${raleway.className} font-[600] w-full`
                              )}
                            >
                              <FormLabel>
                                Order Notes (
                                <span className="italic text-[12px]">
                                  optional
                                </span>
                                )
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  className="resize-none input-text"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Do you have some intructions to include in your
                                order? write it here.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full bg-[#eeeeee] p-10 my-3">
                        <div className="py-3">
                          <p className={cn(`${raleway.className} text-sm`)}>
                            Your personal data will be used to process your
                            order, support your experience throughout this
                            website, and for other purposes described in our
                            privacy policy.
                          </p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="payment_method"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel
                              className={cn(
                                `${raleway.className} font-[600] text-[16px]`
                              )}
                            >
                              Choose Mode of Payment
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleValueChange(value);
                                }}
                                // onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="on_delivery" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Pay during pickup
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="online" readonly />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Pay Online (10% Discount)
                                  </FormLabel>
                                </FormItem>
                                {selectedValue === "online" && (
                                  <div className="hidden-div p-5 my-5 transition-all delay-75 border">
                                    coming soon
                                  </div>
                                )}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="my-5 w-full md:w-fit"
                        id="submitBtn"
                        disabled={selectedValue === "online"}
                      >
                        Complete Checkout
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="w-[93%] mx-auto md:mx-0 md:w-[50%] pt-10 mb-pt-0 mb:pb-20 md:py-20  overflow-x-scroll md:overflow-x-auto">
                <div className="w-full">
                  <table
                    className={cn(`${raleway.className} w-full shop_table`)}
                  >
                    <thead>
                      <tr>
                        <th className="text-left flex">PRODUCT</th>
                        <th>PRICE</th>
                        <th>DAY(s)</th>
                        <th>SUBTOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subTotalWithExtraResource?.map((item) => {
                        const showExtraResources =
                          item?.extra_resource?.police_escort ||
                          item?.extra_resource?.child_seat;
                        return (
                          <tr key={item.id}>
                            <td className="product_name w-[85%]">
                              <h1
                                className={cn(
                                  `${raleway.className} flex text-left font-bold capitalize py-2`
                                )}
                              >
                                {item?.vehicle_name}
                              </h1>
                              <div className="pl-[20px] pt-[10px]">
                                <div className="start-booking-pickup flex text-left flex-col min-h-[90px] relative">
                                  <span className="start-booking-date  font-[600]">
                                    Pickup
                                  </span>
                                  <span className="value">
                                    {formatDateTime(
                                      item?.rideInfo?.pickup_date
                                    )}
                                  </span>
                                  <span className="location-value font-bold capitalize">
                                    {item?.rideInfo?.pickup_location}
                                  </span>
                                </div>
                                <div className="flex text-left flex-col relative">
                                  <span className="end-booking-date font-[600]">
                                    Drop Off
                                  </span>
                                  <span className="value">
                                    {formatDateTime(
                                      item?.rideInfo?.dropoff_date
                                    )}
                                  </span>
                                  <span className="location-value font-bold capitalize">
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
                            <td className="w-[15%] ">
                              {item?.days}&nbsp;day(s)
                            </td>
                            <td className="w-[15%] text-[#da1c36] font-[600]">
                              <div className="flex items-center gap-2">
                                <span>
                                  &#8358;
                                  {new Intl.NumberFormat().format(
                                    item?.subtotal
                                  )}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      <tr className="w-full">
                        <th className="text-left flex uppercase">Total</th>
                        <td className="font-[600]" colSpan={3}>
                          {formatCurrency(subtotal + extraResourcesTotal)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
