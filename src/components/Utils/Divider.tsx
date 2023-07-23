import React from "react";

interface DividerProps {
  style: string;
}
const Divider: React.FC<DividerProps> = ({ style }) => {
  return <div className={`bg-gray-300 w-px h-full  ${style}`}></div>;
};

export default Divider;
