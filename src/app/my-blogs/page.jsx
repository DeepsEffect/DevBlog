"use client";

import BlogCard from "@/components/Homepage/BlogCard/BlogCard";
import useBlogs from "@/hooks/useBlogs";
import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MyBlogsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen gap-2">
          <Spinner size="sm" />
          <p>Loading blogs...</p>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
};

const BlogContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { blogs, loading } = useBlogs({ email });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen gap-2">
        <Spinner size="sm" />
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
      {blogs.length !== 0 ? (
        <>
          {blogs?.map((blog) => (
            <BlogCard blog={blog} pageType="my-blogs" key={blog._id} />
          ))}
        </>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center font-semibold lg:mt-20">
          You haven't posted any blogs yet...
          <div>
            <Link href="/write">
              <Button variant="flat" color="primary">
                Write now?
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogsPage;
