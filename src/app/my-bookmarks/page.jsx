"use client";
import BlogCard from "@/components/Homepage/BlogCard/BlogCard";
import { useSearch } from "@/contexts/SearchContext";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MyBookmarks = () => {
  const session = useSession();
  const email = session?.data?.user?.email;
  const { searchQuery } = useSearch();
  const [sortOption, setSortOption] = useState("");

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

  const {
    data: bookmarks = [],
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["bookmarks", email],
    queryFn: fetchBookmarks,
    staleTime: 1000 * 60 * 5, //  5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    enabled: !!email, // Only run the query if the email is available
  });

  // search bookmarks data
  let bookmarksData = bookmarks;
  if (searchQuery) {
    bookmarksData = bookmarks?.filter((bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // sort by options
  if (bookmarksData) {
    bookmarksData = [...bookmarksData].sort((a, b) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen gap-2">
        <Spinner size="sm" />
        <p>Loading bookmarks...</p>
      </div>
    );
  }
  if (
    isSuccess &&
    (!Array.isArray(bookmarksData) || bookmarksData.length === 0)
  ) {
    return (
      <div className="flex justify-center mt-10 lg:mt-20">No Bookmarks</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-4 lg:mt-6">
      {/* sort options */}
      <div className="max-w-[200px] mx-auto ">
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
      <div className="grid grid-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
        {bookmarksData?.map((blog) => (
          <BlogCard
            bookmarkRefetch={refetch}
            key={blog.blogId}
            blog={blog}
            pageType="my-bookmarks"
          />
        ))}
      </div>
    </div>
  );
};

export default MyBookmarks;
