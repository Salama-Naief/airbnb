"use client";

import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

const uploadPreset = "w7eklsvf";

interface ImageUploadProps {
  value: string;
  onChange: (val: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handelUplaod = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handelUplaod}
      uploadPreset={uploadPreset}
      signatureEndpoint={"/api/cloudinary"}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
           flex
           flex-col
           items-center
           justify-center
           border
           border-dashed
           border-neutral-500
           bg-neutral-100
           w-full
           h-[30vh]
           relative
           rounded
           cursor-pointer
         "
          >
            <div className="flex flex-col justify-center text-neutral-500">
              <TbPhotoPlus size={40} className=" mx-auto" />
              <div className="">Click to upload</div>
            </div>

            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="House"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
