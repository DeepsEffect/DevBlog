import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[80vh] font-bold text-3xl">
      <h2>404 | Not Found</h2>
      <Link href={"/"}>
        <Button>Go Back to Homepage</Button>
      </Link>
    </div>
  );
}
