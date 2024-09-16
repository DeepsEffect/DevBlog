"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  // get the blog data
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/api`);
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  console.log(blogs);

  return (
    <div>
      <div>Total Blogs: {blogs?.length}</div>
    </div>
  );
};

export default page;
