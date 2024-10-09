"use client";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { Button, Tooltip } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Bookmark as BookMarkIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { LoginModal } from "../Modals/LoginModal/LoginModal";

export const Bookmark = ({ blog, page, pageType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();
  const queryClient = useQueryClient();
  const { bookmarks } = useBookmarks();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Check if this specific blog is bookmarked
  const isBookmarked = useMemo(() => {
    if (pageType === "my-bookmarks") {
      return true;
    }
    return bookmarks?.some((bookmark) => bookmark.blogId === blog._id);
  }, [bookmarks, blog._id]);

  // handle bookmark function
  const handleBookmark = async () => {
    if (!session?.data) {
      openModal();
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
          size={page === "blogDetails" ? "sm" : "sm"}
          isIconOnly
        >
          <BookMarkIcon
            fill={`${isBookmarked ? "white" : ""}`}
            size={21}
            strokeWidth={2}
          />
        </Button>
      </Tooltip>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
