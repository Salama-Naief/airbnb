"use client";

import React from "react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface CalenderProps {
  onChange: (e: RangeKeyDict) => void;
  range: Range;
  disabledDates?: Date[];
}
const Calender: React.FC<CalenderProps> = ({
  onChange,
  range,
  disabledDates,
}) => {
  return (
    <DateRange
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      rangeColors={["#262626"]}
      ranges={[range]}
      date={new Date()}
      disabledDates={disabledDates}
      onChange={onChange}
    />
  );
};

export default Calender;
