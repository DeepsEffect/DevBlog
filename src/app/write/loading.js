import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-2">
      <Spinner size="sm" />
      <p>loading...</p>
    </div>
  );
}
