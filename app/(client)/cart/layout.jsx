import "../globals.css";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import Footer from "../_component/Footer";
import Header from "../_component/Header";
import { CartProvider } from "@/context/cartContext";

export const metadata = {
  title: "Cart",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(`${raleway.className}`)}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
