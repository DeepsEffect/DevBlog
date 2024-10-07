"use client";

import BlogCard from "@/components/Homepage/BlogCard/BlogCard";
import SpinnerCustom from "@/components/shared/SpinnerCustom/SpinnerCustom";
import { useSearch } from "@/contexts/SearchContext";
import useBlogs from "@/hooks/useBlogs";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const MyBlogsPage = () => {
  return (
    <Suspense fallback={<SpinnerCustom loadingItemName={"blog"} />}>
      <BlogContent />
    </Suspense>
  );
};

const BlogContent = () => {
  const searchParams = useSearchParams();
  const { searchQuery } = useSearch();
  const email = searchParams.get("email");
  const { blogs, loading, refetch, error } = useBlogs({ email });
  const router = useRouter();
  const [sortOption, setSortOption] = useState("");

  // filter by search query
  let blogsData = blogs;
  if (searchQuery) {
    blogsData = blogs?.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // sort by options
  if (blogsData) {
    blogsData = [...blogsData].sort((a, b) => {
      if (sortOption === "alphabetic") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "newly-added") {
        return new Date(b.postedDate) - new Date(a.postedDate);
      } else if (sortOption === "oldest-first") {
        return new Date(a.postedDate) - new Date(b.postedDate);
      } else if (sortOption === "most-popular") {
        return b.reactions.pogs - a.reactions.pogs;
      }
      return 0;
    });
  }

  if (loading) {
    return <SpinnerCustom loadingItemName={"blog"} />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-4 lg:mt-6">
      {/* sort options */}
      {blogsData?.length !== 0 && (
        <div className=" max-w-[200px] mx-auto ">
          <Select
            size="sm"
            label="Sort By"
            value={sortOption}
            onSelectionChange={(keys) => setSortOption(Array.from(keys)[0])}
          >
            <SelectItem key="newly-added">Newly Added</SelectItem>
            <SelectItem key="oldest-first">Oldest First</SelectItem>
            <SelectItem key="alphabetic">Alphabetic (A-Z)</SelectItem>
            <SelectItem key="most-popular">Most Popular</SelectItem>
          </Select>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
        {blogsData?.length !== 0 ? (
          <>
            {blogsData?.map((blog) => (
              <BlogCard
                refetchMyBlogs={refetch}
                blog={blog}
                pageType="my-blogs"
                key={blog._id}
              />
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center lg:mt-20">
            You haven't posted any blogs yet...
            <div>
              <Button
                onClick={() => router.push("/write")}
                variant="flat"
                color="primary"
              >
                Write now?
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogsPage;
