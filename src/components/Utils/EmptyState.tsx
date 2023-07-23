"use client";

import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
      className="
         h-[60vh]
         w-full
         flex
         flex-col
         items-center
         justify-center
    "
    >
      <Heading center title={title} subtitle={subtitle} />
      {showReset && (
        <div className="my-6">
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
