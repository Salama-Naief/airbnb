import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HomeSkeleton() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col  gap-4 container mx-auto py-10">
      <div
        className="
           grid 
           grid-cols-1 
           sm:grid-cols-2 
           md:grid-cols-3 
           lg:grid-cols-4
           xl:grid-cols-5
           2xl:grid-cols-6
           gap-8
           "
      >
        {arr.map((item) => (
          <div key={item} className="col-span-1">
            <Skeleton height={250} className="w-full" />
            <Skeleton width={"30%"} />
            <Skeleton width={"40%"} />
            <Skeleton width={"50%"} />
          </div>
        ))}
      </div>
    </div>
  );
}
