import { onOpen } from "@/redux/hooks/useSearchSlice";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
const Search = () => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(onOpen())}
      className="rounded-full flex-1 md:flex-none h-fit border p-2 shadow-sm hover:shadow-md transition"
    >
      <div className="flex flex-row items-center  text-sm cursor-pointer">
        <div className="font-[20px] p-1 hidden md:block">
          Anywhere <span className="text-gray-300 mx-2">|</span>
        </div>

        <div className="font-[20px] p-1 flex-1 ">
          Any week
          <span className="text-gray-300 mx-2">|</span>
        </div>
        <div className="font-[18px] text-gray-400 p-1  hidden md:block">
          Add guests{" "}
        </div>
        <div
          className="bg-rose-500 rounded-full p-2 
        flex items-center justify-center text-white"
        >
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
