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
    <div className="max-w-3xl mx-auto mt-4 lg:mt-10 p-2 lg:p-0">
      {/* blog form */}
      <form>
        <div className="space-y-4">
          {/* title section */}
          <section>
            <h2 className="text-text font-semibold text-medium">
              Add title:
            </h2>
            <div className="bg-gray-600 rounded-lg py-6 p-4">
              <div>
                <Input
                  size="lg"
                  className="font-bold text-2xl rounded-none"
                  variant="flat"
                  type="text"
                  placeholder="Write your blog title here..."
                />
              </div>
            </div>
          </section>

          {/* Tiptap editor section */}
          <section>
            <h2 className="text-text font-semibold text-medium">
              Add blog content:
            </h2>
            <div className="bg-gray-600 rounded-lg py-6 p-4">
              <Tiptap />
            </div>
          </section>

          {/* submit button */}
          <Button variant="flat" color="primary" type="button" fullWidth className="font-bold">
            Submit Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
