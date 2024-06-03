import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "../(client)/globals.css";
import "./dashboard.css";
import { Toaster } from "@/components/ui/toaster";

import SideNav from "./_components/sidenav/sidenav";
import { DriverProvider } from "@/context/sortContext";
import { TransactionSortProvider } from "@/context/transactionSortContext";
import { AuthContextProvider } from "@/context/authContext";

export const metadata = {
  title: "Dashboard |  Rofad91 logistic services ltd",
  description: "Rofad91 logistic services ltd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <DriverProvider>
          <TransactionSortProvider>
            <body
              className={cn(
                `${raleway.className} w-full flex h-screen overflow-hidden`
              )}
            >
              <SideNav />
              <div className="bg-[whitesmoke] h-screen rounded-[8px] w-full">
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
