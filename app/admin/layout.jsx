import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "../(client)/globals.css";
import "./dashboard.css";
import { Toaster } from "@/components/ui/toaster";

import SideNav from "./_components/sidenav/sidenav";
import { DriverProvider } from "@/context/sortContext";
import { TransactionSortProvider } from "@/context/transactionSortContext";
import { AuthContextProvider } from "@/context/authContext";
import ToggleSideNav from "./_components/sidenav/toggle";

export const metadata = {
  title: "Dashboard |  Rofad91 logistic services ltd",
  description: "Rofad91 logistic services ltd",
};

export const fetchCache = "force-no-store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <DriverProvider>
          <TransactionSortProvider>
            <body
              className={cn(
                `${raleway.className} w-full h-fit flex md:h-screen overflow-hidden`
              )}
            >
              <SideNav />
              <div className="bg-[whitesmoke] h-screen rounded-[8px] w-full overflow-hidden relative">
                <ToggleSideNav />
                {children}
              </div>
              <Toaster />
            </body>
          </TransactionSortProvider>
        </DriverProvider>
      </AuthContextProvider>
    </html>
  );
}
