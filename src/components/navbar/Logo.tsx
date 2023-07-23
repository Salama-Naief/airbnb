import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.png";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      src={logo}
      className="hidden md:block cursor-pointer"
      width={100}
      height={100}
      priority
      alt="logo"
    />
  );
};

export default Logo;
