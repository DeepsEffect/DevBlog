"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

const edit = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchBlog = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/my-blogs/blog?id=${id}`
    );
    const data = await res.json()
    return data
  };
  const { data: blog = [], isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: fetchBlog,
  });
  console.log(blog);
  return <div>edit: {id}</div>;
};

export default edit;
