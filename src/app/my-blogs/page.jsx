"use client";

import BlogCard from "@/components/Homepage/BlogCard/BlogCard";
import useBlogs from "@/hooks/useBlogs";
import { Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MyBlogsPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { blogs, loading } = useBlogs({ email });
  // console.log(blogs);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen gap-2">
        <Spinner size="sm" />
        <p>Loading blog...</p>
      </div>
    );
  }

  return (
    <Suspense>
      <div className="max-w-3xl mx-auto grid gird-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
        {blogs?.map((blog) => (
          <BlogCard blog={blog} pageType="my-blogs" key={blog._id} />
        ))}
      </div>
    </Suspense>
  );
};

export default MyBlogsPage;
