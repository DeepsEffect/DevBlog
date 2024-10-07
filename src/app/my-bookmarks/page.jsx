"use client";
import BlogCard from "@/components/Homepage/BlogCard/BlogCard";
import SpinnerCustom from "@/components/shared/SpinnerCustom/SpinnerCustom";
import { useSearch } from "@/contexts/SearchContext";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MyBookmarks = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { searchQuery } = useSearch();
  const [sortOption, setSortOption] = useState("");

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    if (!email) return [];
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-bookmarks?email=${email}`
    );
    if (!res.ok) throw new Error("Failed to fetch bookmarks");
    return await res.json();
  };

  const {
    data: bookmarks = [],
    isLoading,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["bookmarks", email],
    queryFn: fetchBookmarks,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
    enabled: !!email, // Run only if email exists
  });

  // Search filter
  let filteredBookmarks = bookmarks;
  if (searchQuery) {
    filteredBookmarks = bookmarks.filter((bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort bookmarks
  if (sortOption) {
    filteredBookmarks = [...filteredBookmarks].sort((a, b) => {
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

  // Render loading spinner
  if (isLoading) {
    return (
      <div>
        <SpinnerCustom loadingItemName="bookmarks" />
      </div>
    );
  }

  if (isFetched && filteredBookmarks.length === 0) {
    return (
      <div className="flex justify-center mt-10 lg:mt-20">No Bookmarks</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-4 lg:mt-6">
      {/* Sort options, only render if there are bookmarks */}
      {filteredBookmarks.length > 0 && (
        <div className="max-w-[200px] mx-auto">
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

      {/* Blog cards */}
      <div className="grid grid-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
        {filteredBookmarks.map((blog) => (
          <BlogCard
            key={blog.blogId}
            blog={blog}
            pageType="my-bookmarks"
            bookmarkRefetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBookmarks;
