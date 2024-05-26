import "../globals.css";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Checkout page",
  description: "Generated by create next app",
};

export default function CheckoutLayout({ children }) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={cn(`${raleway.className}`)}>
          {children}
          <Toaster />
        </body>
      </CartProvider>
    </html>
  );
}
