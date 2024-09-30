"use client";
import BlogCard from "@/components/Homepage/BlogCard/BlogCard";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const MyBookmarks = () => {
  const session = useSession();
  const email = session?.data?.user?.email;

  const fetchBookmarks = async () => {
    if (!email) return [];
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookmarks?email=${email}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch bookmarks");
    }
    const data = await res.json();
    return data;
  };

  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ["bookmarks", email],
    queryFn: fetchBookmarks,
    staleTime: 1000 * 60 * 5, //  5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    enabled: !!email, // Only run the query if the email is available
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen gap-2">
        <Spinner size="sm" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
      {bookmarks?.length !== 0 ? (
        <>
          {bookmarks?.map((blog) => (
            <BlogCard key={blog.blogId} blog={blog} pageType={"my-bookmarks"} />
          ))}
        </>
      ) : (
        <div>No Bookmarks</div>
      )}
    </div>
  );
};

export default MyBookmarks;
