"use client";

import BlogCard from "@/components/Homepage/BlogCard/BlogCard";
import useBlogs from "@/hooks/useBlogs";
import { useSearchParams } from "next/navigation";

const MyBlogsPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { blogs, loading, error } = useBlogs({ email });
  // console.log(blogs);

  return (
    <div className="max-w-3xl mx-auto grid gird-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
      {blogs?.map((blog) => (
        <BlogCard blog={blog} pageType="my-blogs" key={blog._id} />
      ))}
    </div>
  );
};

export default MyBlogsPage;
