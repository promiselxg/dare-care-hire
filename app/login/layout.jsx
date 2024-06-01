import { cn } from "@/lib/utils";
import { barlow } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "@/context/authContext";
import "../admin/dashboard.css";
export const metadata = {
  title: "Login |  Rofad91 logistic services ltd",
  description: "Rofad91 logistic services ltd | Authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={cn(`${barlow.className} bg-[#000]`)}>
          {children}
          <Toaster />
        </body>
      </AuthContextProvider>
    </html>
  );
}
