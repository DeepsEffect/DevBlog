"use client";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

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

  // Sanitize HTML before rendering
  const createMarkup = (htmlContent) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  return (
    <div>
      <div>Total Blogs: {blogs?.length}</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        blogs.map((blog) => (
          <div className="border text-center" key={blog.id}>
            <h2>{blog.title}</h2>
            {/* Render sanitized HTML */}
            <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
          </div>
        ))
      )}
    </div>
  );
};

export default page;
