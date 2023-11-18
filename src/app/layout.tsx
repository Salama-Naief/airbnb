import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/Modals/RegisterModal";
import LoginModal from "@/components/Modals/LoginModal";
import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrent";
import RentModal from "@/components/Modals/RentModal";
import SearchModel from "@/components/Modals/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "airbnb",
  description: " airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang={"en"}>
      <body className={`${inter.className} relative `}>
        <Providers>
          <ToasterProvider />
          <RegisterModal />
          <RentModal />
          <LoginModal />
          <SearchModel />
          <Navbar currentUser={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
