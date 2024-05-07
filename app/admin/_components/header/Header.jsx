import { montserrat, raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellDot } from "lucide-react";

const Header = () => {
  return (
    <>
      <div className="w-full flex h-20 bg-[#fafafb]">
        <div className="p-5 flex items-center justify-between w-full">
          <div>
            <h1 className={cn(`${raleway.className} font-[600]`)}>Dashboard</h1>
          </div>
          <div className="flex gap-5 items-center leading-tight">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none border-none active:outline-none active:border-none">
                <BellDot size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none border-none active:outline-none active:border-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start leading-tight">
                  <span
                    className={cn(
                      `${montserrat.className} font-[600] text-sm leading-tight`
                    )}
                  >
                    John Doe
                  </span>
                  <span
                    className={cn(
                      `${raleway.className} leading-tight text-sm -mt-1`
                    )}
                  >
                    Manager
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
