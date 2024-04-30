"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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

const CarDetails = ({ params }) => {
  const images = [
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/4494977815b9b41fc38001632250464_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/4494977815b9b41fc38001632250464_0_0.jpg",
    },
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/2380273465b9b4201c9a85941365648_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/2380273465b9b4201c9a85941365648_0_0.jpg",
    },
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/5234818685b9b41e9efdab904766573_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/5234818685b9b41e9efdab904766573_0_0.jpg",
    },
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/1763905370593e239dbcfa2394252304_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/1763905370593e239dbcfa2394252304_0_0.jpg",
    },
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/1496713391593e239c46bf7461552922_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/1496713391593e239c46bf7461552922_0_0.jpg",
    },
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/4494977815b9b41fc38001632250464_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/4494977815b9b41fc38001632250464_0_0.jpg",
    },
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/2380273465b9b4201c9a85941365648_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/2380273465b9b4201c9a85941365648_0_0.jpg",
    },
    {
      original:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/5234818685b9b41e9efdab904766573_0_0.jpg",
      thumbnail:
        "https://autostar.pro-theme.info/wp-content/uploads/2018/12/5234818685b9b41e9efdab904766573_0_0.jpg",
    },
  ];
  return (
    <>
      <section className="w-full flex bg-[url('/images/page-img.jpg')] bg-cover pt-[80px] pb-10 bg-fixed bg-right-top relative">
        <span class="bg-[#20262f] absolute top-0 bottom-0 w-full inline-block h-full opacity-0 "></span>
        <div className="container mx-auto flex text-white z-10 md:w-[80%]">
          <div className="text-left">
            <h1
              className={cn(
                `${raleway.className} md:text-[40px] capitalize font-[500] `
              )}
            >
              {params?.slug}
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
                  <BreadcrumbLink href="/cars">Auto Listing</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{params?.slug}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>
      <section className="w-full flex">
        <div className="container w-full md:w-[80%] flex mx-auto py-20 px-5 md:px-0 flex-col md:flex-row">
          <div className="w-full md:w-3/4 ">
            <h1
              className={cn(
                `${raleway.className} text-[20px] md:text-[30px] font-[700] capitalize`
              )}
            >
              {params?.slug}
            </h1>
            <div className="w-full">
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </div>
            <div className="w-full py-5">
              <Tabs defaultValue="description" className="w-full md:w-[90%]">
                <TabsList className=" bg-[#f7f7f7] w-full justify-start text-left py-6">
                  <TabsTrigger
                    value="description"
                    className={cn(`${raleway.className} uppercase`)}
                  >
                    vehicle description
                  </TabsTrigger>
                  <TabsTrigger
                    value="specification"
                    className={cn(`${raleway.className} uppercase`)}
                  >
                    specification
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="description"
                  className="px-4 text-sm text-whitesmoke leading-6"
                >
                  This 2024 model car is Brilliant Black Crystal Pearlcoat with
                  a Black/Diesel Gray interior. Buy confidence knowing Jeep
                  Dodge Ram Surprise has been exceeding customer expectations
                  for many years and always provide customers with a great
                  value!
                </TabsContent>
                <TabsContent value="specification" className="px-4">
                  vehicle specification
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="w-full md:w-1/4 bg-[#f7f7f7]">
            <div
              className={cn(
                `${raleway.className} w-full p-5 bg-black text-white flex justify-center text-center font-[700] text-[20px]`
              )}
            >
              $500.00
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
                >
                  rent this car
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarDetails;
