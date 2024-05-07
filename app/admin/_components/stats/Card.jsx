import { raleway, syne } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const DashboardCard = ({ title, icon, desc, value, bg }) => {
  return (
    <>
      <div className="w-full p-5 rounded-[12px] bg-[white]">
        <h1 className={cn(`${syne.className} capitalize font-[600] text-sm `)}>
          {title}
        </h1>
        <div
          className={cn(
            `${raleway.className} flex justify-between items-center`
          )}
        >
          <h1 className="text-[30px] font-[600]">{value}</h1>
          <div className={cn(`bg-[${bg}] p-5 rounded-full`)}>{icon}</div>
        </div>
        <p className={cn(`${syne.className} font-[600] capitalize text-sm `)}>
          {desc}
        </p>
      </div>
    </>
  );
};

export default DashboardCard;
