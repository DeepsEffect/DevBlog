import React from "react";

const blogDetailsPage = async ({ params }) => {
  const { slug } = params;

  // fetch the blog data on the slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
  if (!res.ok) {
    // TODO: show an actual error page
    return (
      <p className="flex justify-center items-center h-screen text-xl">
        Blog not found
      </p>
    );
  }
  const blog = await res.json();
  // console.log(blog);
  return (
    <div>
      blogDetails
      <h2>{blog.title}</h2>
      <h2>{blog.slug}</h2>
    </div>
  );
};

export default blogDetailsPage;
