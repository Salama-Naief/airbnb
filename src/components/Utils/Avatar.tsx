"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { avatar } from "../../../public/images";

interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      src={src ? src : avatar}
      className="rounded-full"
      alt="avatar"
      width={30}
      height={30}
    />
  );
};

export default Avatar;
