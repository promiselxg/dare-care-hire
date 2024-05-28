import { Skeleton } from "@/components/ui/skeleton";
import { barlow } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const DashboardCard = ({ loading, title, icon, desc, value, bg, bgColor }) => {
  return (
    <>
      <div
        className="w-full p-5 rounded-[12px]"
        style={{
          backgroundColor: `${bgColor ? `${bgColor}` : "white"}`,
          color: `${bgColor ? `white` : "#000"}`,
        }}
      >
        <h1
          className={cn(`${barlow.className} capitalize font-[600] text-sm `)}
        >
          {loading ? (
            <Skeleton className="h-[6px] w-1/2 rounded-[5px] bg-[--primary-text-color]" />
          ) : (
            title
          )}
        </h1>
        <div
          className={cn(
            `${barlow.className} flex justify-between items-center`
          )}
        >
          <h1 className="text-[30px] font-[600] text-wrap">
            {loading ? (
              <Skeleton className="h-12 w-12 rounded-full bg-[--primary-text-color]" />
            ) : (
              value
            )}
          </h1>
          {icon ? (
            <div className={cn(`bg-[${bg}] p-5 rounded-full`)}>{icon}</div>
          ) : (
            <div className="py-5">&nbsp;</div>
          )}
        </div>
        <p className={cn(`${barlow.className} font-[600] capitalize text-sm `)}>
          {loading ? "" : desc}
        </p>
      </div>
    </>
  );
};

export default DashboardCard;
