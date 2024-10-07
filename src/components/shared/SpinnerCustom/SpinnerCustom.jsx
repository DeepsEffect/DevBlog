import { Spinner } from "@nextui-org/react";
import React from "react";

const SpinnerCustom = ({ loadingItemName }) => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-65px)] gap-2">
      <Spinner size="sm" />
      <p>Loading {loadingItemName}...</p>
    </div>
  );
};

export default SpinnerCustom;
