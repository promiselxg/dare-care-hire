import { open_sans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiInstagram } from "react-icons/fi";
import { SlSocialSpotify } from "react-icons/sl";
import { PiTiktokLogoLight } from "react-icons/pi";
import { Phone, Mail, MapPin, Youtube } from "lucide-react";

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
                className="w-[200px] h-[200px] object-contain"
              />
              <div className="my-5">
                <p
                  className={cn(
                    `${open_sans.className} font-[400] text-sm text-[--primary-text-color] leading-[1.7]`
                  )}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
                  odio!
                </p>
              </div>
              <div className="flex items-center text-[--primary-text-color] mb-5 gap-4">
                <a
                  href="https://www.youtube.com/@Djzaddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all delay-75 hover:text-[--text-brown] cursor-pointer"
                >
                  <Youtube size={40} />
                </a>
                <a
                  href="https://open.spotify.com/user/jg47bne0dyy3hnj0wb882b3qs?si=TjEelt1VTnGIXCuPqm_qgQ "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all delay-75 hover:text-[--text-brown] cursor-pointer"
                >
                  <SlSocialSpotify size={40} />
                </a>
                <a
                  href="https://www.instagram.com/deejay_zaddy/?igsh=bG54dnNudWh2ZjIz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all delay-75 hover:text-[--text-brown] cursor-pointer"
                >
                  <FiInstagram size={40} />
                </a>
                <a
                  href="https://www.tiktok.com/@bidexibile?_t=8lYEdBiZYMz&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all delay-75 hover:text-[--text-brown] cursor-pointer"
                >
                  <PiTiktokLogoLight size={40} />
                </a>
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
      </div>
    </>
  );
};

export default Footer;
