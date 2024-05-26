import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="fixed top-0 bottom-0 w-full bg-[rgba(0,0,0,.8)] z-[999] h-screen overflow-hidden text-white flex items-center justify-center flex-col gap-y-2">
        <Loader2 className="animate-spin" size={50} />
        loading...
      </div>
    </>
  );
};

export default Loading;
