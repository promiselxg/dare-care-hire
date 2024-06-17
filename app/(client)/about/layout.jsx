import "../globals.css";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import Footer from "../_component/Footer";
import Header from "../_component/Header";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "About Us  | Rofad91 Logistics Services.",
  description:
    "Rofad91 Logistics Services is a premier car hire company in Nigeria, renowned for its commitment to delivering exceptional transportation solutions. Our extensive fleet includes luxury sedans, SUVs, and spacious buses, all meticulously maintained and equipped with modern amenities to meet diverse client needs.",
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
