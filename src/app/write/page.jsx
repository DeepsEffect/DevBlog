"use client";
import Tiptap from "@/components/Tiptap/Tiptap";
import usePrivateRoute from "@/hooks/usePrivateRoute";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

const WritePage = () => {
  const { session, status } = usePrivateRoute();
  const [blogTitle, setBlogTitle] = useState(""); // Handle title
  const [blogContent, setBlogContent] = useState(""); // Handle content
  const [loading, setLoading] = useState(false);

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

  // handle posting the blog data
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const blogData = { blogTitle, blogContent };
    // console.log(blogData);

    try {
      // send the blog data to DB
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/write/api`, {
        method: "POST",
        body: JSON.stringify(blogData),
        headers: {
          "Content-type": "application/json",
        },
      });

      const responseData = await resp.json(); // Parse the JSON response

      if (resp.ok) {
        toast.success(responseData.message || "Blog posted successfully!");
      } else {
        toast.error(responseData.message || "Failed to post blog.");
      }
    } catch (error) {
      console.log("error during fetch: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 lg:mt-10 p-2 lg:p-0">
      {/* blog form */}
      <form onSubmit={handleBlogSubmit}>
        <div className="space-y-4">
          {/* title section */}
          <section>
            <h2 className="text-text font-semibold text-medium">Add title:</h2>
            <div className="bg-gray-600 rounded-lg py-6 p-4">
              <div>
                <Input
                  required
                  size="lg"
                  className="font-bold text-2xl rounded-none"
                  variant="flat"
                  type="text"
                  placeholder="Write your blog title here..."
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
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
              {/* get the blog content from Tiptap component and store it in a state */}
              <Tiptap setContent={setBlogContent} />
            </div>
          </section>

          {/* submit button */}
          <Button
            variant="flat"
            color="primary"
            type="submit"
            fullWidth
            className="font-bold"
            isLoading={loading}
          >
            {loading ? "Posting Blog" : "Post Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WritePage;
