"use client";

import React, { useEffect, useMemo, useState } from "react";
import Calender from "../inputs/Calender";
import { User } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { Range, RangeKeyDict } from "react-date-range";
import Button from "../Utils/Button";
import { useDispatch } from "react-redux";
import { onOpen } from "@/redux/hooks/useLoginSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingResProps {
  price: number;
  currentUser: User | null;
  listingId: string;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingResProps> = ({
  price,
  currentUser,
  listingId,
  disabledDates,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const dispatch = useDispatch();
  const totalPrice = useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && price) {
        return dayCount * price;
      } else {
        return price;
      }
    }
  }, [dateRange, price]);

  const onChange = (range: RangeKeyDict) => {
    setDateRange(range.selection);
  };

  const handleSubmit = () => {
    if (!currentUser) {
      dispatch(onOpen());
      toast.error("you must be logedin!");
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId,
      })
      .then(({ data }) => {
        console.log("reservationdata", data);
        if (data.status === "success") {
          toast.success("reservetion success");
          router.refresh();
        }
        if (data.status === "error") {
          data.errors.map((e: any) => {
            toast.error(e.message);
          });
        }
      })
      .catch((e) => {
        toast.error("something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className="
        rounded-xl 
        border-[1px] 
        border-neutral-200 
        overflow-hidden 
        py-10 
        bg-white
        px-4
        flex
        flex-col
        gap-4
        "
    >
      <div className="flex flex-row items-center space-x-1px-4">
        <div className="font-bold text-2xl">${price} </div>
        <div className="font-light text-neutral-400">night</div>
      </div>
      <hr />
      <Calender
        onChange={onChange}
        range={dateRange}
        disabledDates={disabledDates}
      />
      <Button label="Resarve" onClick={handleSubmit} isLoading={isLoading} />
      <hr />
      <div className="flex flex-row items-center justify-between font-semibold px-4">
        <div className="text-neutral-700">Total price</div>
        <div className="">${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
