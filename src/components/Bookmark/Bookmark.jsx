"use client";
import { Button, Tooltip } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

export const Bookmark = ({ blog, page }) => {
  const session = useSession();
  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    if (!session?.data) {
      toast.error("Please login to bookmark");
      return; // Prevent further execution
    }
    
    try {
      const email = session?.data?.user?.email;
      const username = session?.data?.user?.name;
      const bookmarkedBy = { username, email };
      const bookmarkDate = new Date().toISOString();
      const { _id: blogId, ...bookmarkPayload } = blog;

      // bookmark data
      const bookmarkData = {
        blogId,
        ...bookmarkPayload,
        bookmarkedBy,
        bookmarkDate,
      };
      // send data to db
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookmark`,
        {
          method: "POST",
          body: JSON.stringify(bookmarkData),
          headers: {
            "Content-type": "Application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message);
        queryClient.invalidateQueries("bookmarks");
      } else if (res.status === 409) {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Tooltip content="bookmark blog">
        <Button
          onClick={handleBookmark}
          variant={page === "blogDetails" ? "flat" : "light"}
          size={page === "blogDetails" ? "sm" : "md"}
          isIconOnly
        >
          <FaRegBookmark className="text-xl " />
          {/* <FaBookmark className="text-xl"/> */}
        </Button>
      </Tooltip>
    </div>
  );
};
