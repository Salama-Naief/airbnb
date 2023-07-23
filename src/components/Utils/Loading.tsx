import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

interface LoadingProps {
  type: LoadingType | undefined;
  color: string;
  width?: number;
  hieght?: number;
}
const Loading: React.FC<LoadingProps> = ({ type, color, hieght, width }) => (
  <div className="flex justify-center">
    <ReactLoading
      type={type}
      color={color}
      height={hieght || 30}
      width={width || 30}
    />
  </div>
);

export default Loading;
