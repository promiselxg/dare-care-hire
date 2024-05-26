import "../globals.css";
import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import Footer from "../_component/Footer";
import Header from "../_component/Header";

export const metadata = {
  title: "Rofad91 logistic services ltd",
  description: "No 1 Care hire services in Nigeria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(`${raleway.className}`)}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
