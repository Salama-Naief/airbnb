"use client";

import { addRentCounters } from "@/redux/hooks/rentSlice";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";

interface CounterInputProps {
  title: string;
  subTitle: string;
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}
const CounterInput: React.FC<CounterInputProps> = ({
  subTitle,
  title,
  value,
  onDecrease,
  onIncrease,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className="
        p-4
        flex
        flex-row
        items-center
        justify-between
    "
    >
      <div>
        <div className="text-lg">{title}</div>
        <div className="text-sm text-neutral-500">{subTitle}</div>
      </div>
      <div
        className="
            flex 
            flex-row 
            justify-between
            items-center
            space-x-6
            "
      >
        <button
          onClick={onDecrease}
          disabled={value <= 1}
          className="
            rounded-full
            p-1.5
            border
            border-neutral-900
            hover:border-neutral-500
            text-neutral-900
            hover:text-neutral-500
            transtion-all
       "
        >
          <AiOutlineMinus size={18} />
        </button>

        <div>{value}</div>
        <button
          onClick={onIncrease}
          className="
            rounded-full
            p-1.5
            border
            border-neutral-900
            hover:border-neutral-500
            text-neutral-900
            hover:text-neutral-500
            transtion-all
       "
        >
          <AiOutlinePlus size={18} />
        </button>
      </div>
    </div>
  );
};

export default CounterInput;
