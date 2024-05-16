"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./slug.css";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import SkeletonLoader from "../../_component/Loader";
import { formatCurrency } from "@/utils/formatCurrency";
import { Loader2, ShieldCheck } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { checkDate, dateDiffInDays } from "@/utils/getDateDifference";

const CarDetails = ({ params }) => {
  const { loading, data } = useFetch(`/car/${params?.slug}`);
  const { addItemToCart, isloading } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [inputValues, setInputValues] = useState({
    pickup_location: "",
    dropoff_location: "",
    pickup_date: "",
    dropoff_date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const images = data?.imgUrl?.map((url, index) => {
    return {
      original: url,
      thumbnail: data?.imgUrl[index === 0 ? 0 : 1],
    };
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleAddToCart = async () => {
    const totalDays = dateDiffInDays(
      inputValues.pickup_date,
      inputValues.dropoff_date
    );
    if (totalDays === "wrong_date") {
      toast({
        variant: "destructive",
        title: "Pick-up Date cannot be greater than Drop-off  Date",
      });
      return false;
    }
    const subtotal = totalDays * data?.amount;
    try {
      const response = await addItemToCart({
        id: data?.id,
        vehicle_name: data?.vehicle_name,
        amount: data?.amount,
        quantity: 1,
        days: totalDays,
        subtotal: subtotal,
        imgUrl: data?.imgUrl[0],
        rideInfo: {
          pickup_location: inputValues.pickup_location,
          dropoff_location: inputValues.dropoff_location,
          pickup_date: inputValues.pickup_date,
          dropoff_date: inputValues.dropoff_date,
        },
      });
      toast({ title: `${response?.message}` });
      router.push("/cart");
    } catch (error) {
      console.error(error);
    }
  };
  if (data?.message === "No Record found with the ID Provided") {
    redirect("/cars");
  }

  return (
    <>
      <div className="relative">
        <section className="w-full flex bg-[url('/images/page-img.jpg')] bg-cover pt-[80px] pb-10 bg-fixed bg-right-top relative">
          <span className="bg-[#20262f] absolute top-0 bottom-0 w-full inline-block h-full opacity-0 "></span>
          <div className="container mx-auto flex text-white z-10 md:w-[80%]">
            <div className="text-left">
              <h1
                className={cn(
                  `${raleway.className} md:text-[40px] capitalize font-[500] `
                )}
              >
                {data?.vehicle_name}
              </h1>
              <Breadcrumb>
                <BreadcrumbList
                  className={cn(
                    `${raleway.className} font-[400] text-[12px] text-[whitesmoke]`
                  )}
                >
                  <BreadcrumbItem>
                    <Link href="/">Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <Link href="/cars">Auto Listing</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">
                      {data?.vehicle_name}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </section>
        <section className="w-full flex">
          <div className="container w-full md:w-[80%] flex mx-auto py-20 px-5 md:px-0 flex-col md:flex-row gap-5">
            <div className="w-full md:w-3/4 ">
              <h1
                className={cn(
                  `${raleway.className} text-[20px] md:text-[30px] font-[700] capitalize mb-5`
                )}
              >
                {data?.vehicle_name}
              </h1>
              <div className="w-full">
                {loading ? (
                  <SkeletonLoader />
                ) : (
                  data?.imgUrl && (
                    <ImageGallery
                      items={images}
                      showFullscreenButton={false}
                      showPlayButton={false}
                    />
                  )
                )}
              </div>
              <div className="w-full py-5">
                <Tabs defaultValue="description" className="w-full md:w-[90%]">
                  <TabsList className=" bg-[#f7f7f7] w-full justify-start text-left py-6">
                    <TabsTrigger
                      value="description"
                      className={cn(`${raleway.className} uppercase tab`)}
                    >
                      vehicle description
                    </TabsTrigger>
                    <TabsTrigger
                      value="specification"
                      className={cn(`${raleway.className} uppercase tab`)}
                    >
                      specification
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="description"
                    className="px-4 text-sm text-whitesmoke leading-6"
                  >
                    {data?.description}
                  </TabsContent>
                  <TabsContent value="specification" className="px-4">
                    <ul className="w-full grid md:grid-cols-4 grid-cols-2 gap-2 text-[12px] my-5">
                      {data?.features?.split(",")?.map((feature, i) => (
                        <li
                          className="flex items-center mb-[4px] gap-1"
                          key={i}
                        >
                          <ShieldCheck size={20} />
                          <span className="capitalize">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="w-full md:w-1/4 bg-[#f7f7f7] h-fit">
              <div
                className={cn(
                  `${raleway.className} w-full p-5 bg-black text-white flex justify-center text-center font-[700] text-[20px]`
                )}
              >
                {formatCurrency(data?.amount)}
              </div>
              <div className="w-full p-5 flex-col flex gap-y-1">
                <div className="w-full flex flex-col my-2">
                  <label
                    htmlFor="pickup_location"
                    className={cn(
                      `${raleway.className} uppercase mb-2 font-[600] text-[13px]`
                    )}
                  >
                    Pick-up location
                  </label>
                  <input
                    type="text"
                    name="pickup_location"
                    placeholder="Pick-up Location"
                    value={inputValues.name}
                    onChange={handleInputChange}
                    className="w-full  p-2 bg-white outline-none border border-[#eee] rounded-[5px]  text-[--primary-bg] "
                  />
                </div>
                <div className="w-full flex flex-col my-2">
                  <label
                    htmlFor="dropoff_location"
                    className={cn(
                      `${raleway.className} uppercase mb-2 font-[600] text-[13px]`
                    )}
                  >
                    drop-off location
                  </label>
                  <input
                    type="text"
                    name="dropoff_location"
                    placeholder="drop-off Location"
                    value={inputValues.name}
                    onChange={handleInputChange}
                    className="w-full  p-2 bg-white outline-none border border-[#eee] rounded-[5px] "
                  />
                </div>
                <div className="w-full flex flex-col my-2">
                  <label
                    htmlFor="pickup_date"
                    className={cn(
                      `${raleway.className} uppercase mb-2 font-[600] text-[13px]`
                    )}
                  >
                    pick-up date
                  </label>
                  <input
                    type="datetime-local"
                    name="pickup_date"
                    value={inputValues.name}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full  p-2 bg-white outline-none border border-[#eee] rounded-[5px] uppercase"
                  />
                </div>
                <div className="w-full flex flex-col my-2">
                  <label
                    htmlFor="dropoff_date"
                    className={cn(
                      `${raleway.className} uppercase mb-2 font-[600] text-[13px]`
                    )}
                  >
                    drop-off date
                  </label>
                  <input
                    type="datetime-local"
                    name="dropoff_date"
                    value={inputValues.name}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full  p-2 bg-white outline-none border border-[#eee] rounded-[5px] uppercase"
                  />
                </div>
                <div className="w-full flex flex-col my-2 gap-2">
                  <label
                    htmlFor="extra_resources"
                    className={cn(
                      `${raleway.className} uppercase mb-2 font-[600] text-[13px]`
                    )}
                  >
                    Extra resources
                  </label>
                  <div
                    className={cn(
                      `${raleway.className} uppercase text-[12px] flex items-center justify-between`
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input type="checkbox" name="child_seat" id="" />
                      child seat
                    </span>
                    <span>$10</span>
                  </div>
                  <div
                    className={cn(
                      `${raleway.className} uppercase text-[12px] flex items-center justify-between`
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input type="checkbox" name="additional_driver" id="" />
                      additional driver
                    </span>
                    <span>$30</span>
                  </div>
                  <div
                    className={cn(
                      `${raleway.className} uppercase text-[12px] flex items-center justify-between`
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input type="checkbox" name="wifi_access" id="" />
                      wifi access
                    </span>
                    <span>$20</span>
                  </div>
                  <div
                    className={cn(
                      `${raleway.className} uppercase text-[12px] flex items-center justify-between`
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input type="checkbox" name="gps_navigation" id="" />
                      gps navigation
                    </span>
                    <span>$10</span>
                  </div>
                </div>
                <div className="w-full my-5">
                  <Button
                    className={cn(
                      `${raleway.className} w-full bg-[--button-bg] font-[500] hover:scale-[1.1] hover:bg-[--button-bg] rounded-[5px] py-6 px-8 text-white transition-all delay-75 uppercase`
                    )}
                    disabled={
                      isloading ||
                      !inputValues.pickup_location ||
                      !inputValues.dropoff_location ||
                      !inputValues.pickup_date ||
                      !inputValues.dropoff_date
                    }
                    onClick={handleAddToCart}
                  >
                    rent this car
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loading && (
          <div className="fixed top-0 bottom-0 w-full bg-[rgba(0,0,0,.8)] z-[999] h-screen overflow-hidden text-white flex items-center justify-center flex-col gap-y-2">
            <Loader2 className="animate-spin" size={50} />
            loading...
          </div>
        )}
      </div>
    </>
  );
};

export default CarDetails;
