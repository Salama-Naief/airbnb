"use client";

import Select from "react-select";
import React from "react";
import { LocationType } from "@/types/index";
import useCountries from "@/hooks/useCountries";

interface CountrySelectProps {
  value?: LocationType;
  onClick: (val: LocationType) => void;
}
const CountrySelect: React.FC<CountrySelectProps> = ({ onClick, value }) => {
  const { getAll } = useCountries();
  return (
    <div className="">
      <Select
        placeholder="Every where"
        options={getAll()}
        onChange={(val) => onClick(val as LocationType)}
        isClearable
        className="relative"
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        value={value}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row space-x-2 text-sm">
            <div className="">{option.flag}</div>
            <div className="">
              {option.label},
              <span className="text-neutral-400">{option.region}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CountrySelect;
