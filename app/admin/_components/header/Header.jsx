import AuthContext from "@/context/authContext";
import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="w-full flex h-20 bg-[#fafafb]">
        <div className="p-5 flex items-center justify-between w-full">
          <div>
            <h1 className={cn(`${raleway.className} font-[600] text-[16px]`)}>
              Welcome back, <span className="capitalize">{user?.userN}</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
