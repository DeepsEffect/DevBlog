"use client";
import Tiptap from "@/components/Tiptap/Tiptap";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Button, Input, Spinner } from "@nextui-org/react";

const WritePage = () => {
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

  return (
    <div className="max-w-3xl mx-auto mt-4 lg:mt-10 p-3 lg:p-0">
      <form>
        <div className="space-y-4">
          <label htmlFor="title">
            <Input
              size="lg"
              className="font-bold text-2xl"
              variant="flat"
              type="text"
              placeholder="Write your blog title here..."
            />
          </label>
          {/* tiptap editor */}
            <Tiptap />
          <Button variant="flat" color="primary" type="button" fullWidth>
            Submit Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
