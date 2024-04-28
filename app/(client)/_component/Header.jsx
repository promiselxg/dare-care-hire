import { montserrat, syne } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="w-full flex bg-[#000]  h-[80px] items-center">
        <div className="container w-[80%] mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  width="150"
                  height={50}
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              <ul
                className={cn(
                  `${montserrat.className} text-white flex items-center gap-5 text-sm uppercase`
                )}
              >
                <li className=" hover:text-[--text-hover] transition-all delay-75">
                  <Link href="/">Home</Link>
                </li>
                <li className=" hover:text-[--text-hover] transition-all delay-75">
                  <Link href="/auto-listing">Auto Listing</Link>
                </li>
                <li className=" hover:text-[--text-hover] transition-all delay-75">
                  <Link href="/">About Us</Link>
                </li>
                <li className=" hover:text-[--text-hover] transition-all delay-75">
                  <Link href="/">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
