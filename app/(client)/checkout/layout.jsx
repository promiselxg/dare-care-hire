import "../globals.css";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Checkout page | Rofad91 Global Services Limited",
  description:
    "At Rofad91 Logistics Services, we are committed to excellence in every aspect of our service. Our vehicles are regularly serviced and maintained to ensure reliability and comfort. We strive to exceed client expectations by providing personalized and professional transportation services.",
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
