"use client"; // Error boundaries must be Client Components

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex flex-col justify-center items-center gap-2 mt-2">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <Button size="sm" color="primary" variant="flat">Try again</Button>
      </button>
    </div>
  );
}
