"use client";
import { Button, ButtonGroup, Spinner } from "@nextui-org/react";
import BlogCard from "./BlogCard/BlogCard";
import { RightSidebar } from "./BlogCard/RightSidebar/RightSidebar";
import { LeftSidebar } from "./BlogCard/LeftSidebar/LeftSidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/SearchContext";
import { useCategory } from "@/contexts/CategoryContext";
import { useQuery } from "@tanstack/react-query";
import BlogCardSkeleton from "../shared/BlogCardSkeleton/BlogCardSkeleton";

export const Homepage = () => {
  const { searchQuery } = useSearch();
  const { selectedCategory, handleSelectedCategory } = useCategory();
  const [sortOption, setSortOption] = useState("latest");
  const router = useRouter();

  // Fetch blogs using TanStack Query
  const fetchBlogs = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/blogs/api`;
    if (selectedCategory) {
      url += `?category=${encodeURIComponent(selectedCategory)}`;
    }
    const res = await fetch(url);
    const data = await res.json();

    // Ensure data is an array
    let blogsData = Array.isArray(data) ? data : [];

    // Filter data based on search query
    if (searchQuery) {
      blogsData = blogsData.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort the blogs based on selected option
    let sortedData = [...blogsData];
    if (sortOption === "latest") {
      sortedData.sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    } else if (sortOption === "pogged") {
      sortedData.sort((a, b) => b.reactions.pogs - a.reactions.pogs);
    }

    return sortedData;
  };
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs", selectedCategory, sortOption, searchQuery],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5, //  5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });

  // Function to set the sort to the sortOption state
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-4 py-4 lg:py-6">

      {/* left sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3 lg:p-4">
        <LeftSidebar
          onCategorySelect={handleSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </aside>

      {/* main content */}
      <main className="col-span-1 md:col-span-2 lg:col-span-6 lg:p-4 text-center">
        <ButtonGroup>
          <Button
            variant={sortOption === "latest" ? "flat" : "light"}
            onClick={() => handleSortChange("latest")}
          >
            Latest
          </Button>
          <Button
            variant={sortOption === "relevant" ? "flat" : "light"}
            onClick={() => handleSortChange("relevant")}
          >
            Relevant
          </Button>
          <Button
            variant={sortOption === "pogged" ? "flat" : "light"}
            onClick={() => handleSortChange("pogged")}
          >
            Pogged
          </Button>
        </ButtonGroup>

        {/* show blog cards */}
        <div className="grid gird-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
          {isLoading ? (
            // Show skeletons while loading
            Array.from({ length: 5 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : (
            <>
              {blogs?.length === 0 ? (
                <div className="flex items-center justify-center lg:mt-10">
                  <div>
                    {selectedCategory ? (
                      <div className="flex flex-col gap-3 items-center justify-center">
                        <p>
                          No blogs were found for category "{selectedCategory}"
                        </p>
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          onClick={() => router.push("/write")}
                        >
                          Write Blog...
                        </Button>
                      </div>
                    ) : (
                      "No blogs found"
                    )}
                  </div>
                </div>
              ) : (
                Array.isArray(blogs) &&
                blogs.map((blog) => (
                  <BlogCard blog={blog} pageType="homepage" key={blog._id} />
                ))
              )}
            </>
          )}
        </div>
      </main>

      {/* right sidebar content */}
      <aside className="col-span-1 lg:col-span-3 lg:p-4">
        <RightSidebar />
      </aside>
    </div>
  );
};
