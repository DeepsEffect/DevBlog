"use client";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Spinner } from "@nextui-org/react";

const page = () => {
  const { session, status } = usePrivateRoute();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen gap-2">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null; // Return nothing while redirecting
  }

  return <div>write blog form...</div>;
};

export default page;
