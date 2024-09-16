"use client";
import DOMPurify from "dompurify";
import useBlogs from "@/hooks/useBlogs";

const blogPage = () => {
  const { blogs, loading } = useBlogs();
  // console.log(blogs);

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

export default blogPage;
