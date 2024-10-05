"use client";
import { Button, Tooltip } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

export const Bookmark = ({ blog, page, isBookmarked }) => {
  const session = useSession();
  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    if (!session?.data) {
      toast.error("Please login to bookmark");
      return;
    } else if (!session?.data?.user?.email) {
      toast.error(
        "Email not found.\n sorry, you need an email to add to bookmark"
      );
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
          {isBookmarked ? (
            <FaBookmark className="text-xl" />
          ) : (
            <FaRegBookmark className="text-xl" />
          )}
        </Button>
      </Tooltip>
    </div>
  );
};
