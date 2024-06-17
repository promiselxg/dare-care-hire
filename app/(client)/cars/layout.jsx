import "../globals.css";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import Footer from "../_component/Footer";
import Header from "../_component/Header";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Auto Listing | Rofad91 Logistics Services",
  description:
    "At Rofad91 Logistics Services, we are committed to excellence in every aspect of our service. Our vehicles are regularly serviced and maintained to ensure reliability and comfort. We strive to exceed client expectations by providing personalized and professional transportation services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={cn(`${raleway.className}`)}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </CartProvider>
    </html>
  );
}
