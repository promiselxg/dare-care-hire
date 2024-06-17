import { open_sans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiInstagram } from "react-icons/fi";
import { SlSocialSpotify } from "react-icons/sl";
import { PiTiktokLogoLight } from "react-icons/pi";
import { Phone, Mail, MapPin, Youtube, Facebook } from "lucide-react";
import Tawk from "@/utils/tawk";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="relative">
        <div className="w-full h-fit bg-[--primary-bg]">
          <div className="w-full mx-auto p-10 md:p-20 flex justify-between gap-8 ">
            <div className="md:w-1/2 mx-auto flex justify-center items-center text-center flex-col">
              <Image
                src="/images/logo.png"
                width={300}
                height={50}
                alt="logo"
                className="w-[250px] h-[300px] object-contain"
              />
              <div className="my-5">
                <p
                  className={cn(
                    `${open_sans.className} font-[400] text-sm text-[--primary-text-color] leading-[1.7]`
                  )}
                >
                  Rofad91 Logistics Services All rights reserved.
                </p>
              </div>
              <div className="flex items-center text-[--primary-text-color] mb-5 gap-4">
                <a
                  href="https://facebook.com/rofad91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all delay-75 hover:text-[--text-brown] cursor-pointer"
                >
                  <Facebook size={40} />
                </a>
                {/* <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all delay-75 hover:text-[--text-brown] cursor-pointer"
                >
                  <SlSocialSpotify size={40} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all delay-75 hover:text-[--text-brown] cursor-pointer"
                >
                  <FiInstagram size={40} />
                </a> */}
              </div>
              <p
                className={cn(
                  `${open_sans.className} font-[400] text-sm text-[--primary-text-color] leading-[1.7]`
                )}
              >
                Copyright &copy; {currentYear}{" "}
              </p>
            </div>
          </div>
        </div>
        <Tawk />
      </div>
    </>
  );
};

export default Footer;
