import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ListingSkeleton() {
  return (
    <div className="flex flex-col  gap-4 container mx-auto py-10">
      <Skeleton width={200} />
      <Skeleton width={250} />
      <Skeleton height={300} />
      <div className="grid md:grid-cols-7 gap-10">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Skeleton width={300} />
            <Skeleton width={40} height={40} circle />
          </div>
          <hr />
          <div className="flex items-center gap-4">
            <Skeleton width={40} height={40} />
            <Skeleton width={300} />
          </div>
          <hr />
          <div className="">
            <Skeleton width={350} count={4} />
          </div>
          <hr />
          <Skeleton height={300} />
        </div>
        <div className="col-span-1 order-1 md:order-2 md:col-span-3 py-10 px-4 rounded-xl border-neutral-400 flex flex-col gap-4">
          <Skeleton width={200} />
          <hr />
          <Skeleton height={400} />
          <hr />
          <Skeleton height={40} />
          <hr />
          <Skeleton height={20} />
        </div>
      </div>
    </div>
  );
}
