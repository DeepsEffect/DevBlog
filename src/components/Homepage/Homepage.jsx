"use client";
import { Button, ButtonGroup, Spinner } from "@nextui-org/react";
import BlogCard from "./BlogCard/BlogCard";
import { RightSidebar } from "./BlogCard/RightSidebar/RightSidebar";
import { LeftSidebar } from "./BlogCard/LeftSidebar/LeftSidebar";
import { useEffect, useState } from "react";

export const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/blogs/api`;
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-4 py-4 lg:py-6 ">
      {/* TODO: toggle button for right sidebar for mobile view */}

      {/* left sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3 lg:p-4">
        <LeftSidebar />
      </aside>

      {/* main content */}
      <main className="col-span-1 md:col-span-2 lg:col-span-6 lg:p-4 text-center">
        <ButtonGroup>
          <Button>Latest</Button>
          <Button>Relevant</Button>
          <Button>Pogged</Button>
        </ButtonGroup>

        {/* show blog cards */}
        <div className="grid gird-cols-1 gap-4 lg:p-4 mt-4 lg:mt-2">
          {loading ? (
            <div className="flex justify-center items-center gap-2 lg:mt-10">
              <Spinner size="sm" />
              <p>Loading blogs...</p>
            </div>
          ) : (
            <>
              {blogs?.length === 0 ? (
                <div className="flex items-center justify-center lg:mt-10">
                  <p>No blogs found</p>
                </div>
              ) : (
                blogs?.map((blog) => (
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
