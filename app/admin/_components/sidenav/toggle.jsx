"use client";
import AuthContext from "@/context/authContext";
import { GanttChart } from "lucide-react";
import { useContext } from "react";

const ToggleSideNav = () => {
  const { hanldeOpenNav } = useContext(AuthContext);
  return (
    <>
      <div className="relative top-2 left-2 bottom-2 bg-[rgba(0,0,0,0.2)] w-fit p-2 rounded-[5px] cursor-pointer z-50">
        <GanttChart
          size={30}
          color="#007eff"
          className=""
          onClick={hanldeOpenNav}
        />
      </div>
    </>
  );
};

export default ToggleSideNav;
