"use client";
import { Button, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddComment({ slug }) {
  const session = useSession();
  const email = session?.data?.user?.email;
  const [commentContent, setCommentContent] = useState("");
  const router = useRouter();

  // scrolling to hashed location if exists
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#add-comment") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // handle add comment
  const handleAddComment = async () => {
    // check if there email
    if (!email) {
      toast.error("Please login to post comment");
      return;
    }
    // Check if the comment content is empty
    if (!commentContent.trim()) {
      toast.error("Please write something in the comment");
      return;
    }
    const commentData = {
      user: session?.data?.user?.name,
      email: session?.data?.user?.email,
      image: session?.data?.user?.image,
      comment: commentContent,
    };

    // send comment data to database
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/add-comment`,
        {
          method: "PUT",
          headers: { "Content-Type": "Application/json" },
          body: JSON.stringify({ slug, comment: commentData }),
        }
      );
      if (res.ok) {
        toast.success("Comment posted successfully!");
        setCommentContent(""); //clear the textarea
        router.refresh();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to post comment");
      }
    } catch (error) {
      console.log("Error posting comment: ", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div id="add-comment">
      {/* add comments section */}
      <section className="mt-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Add a comment: </h2>
          <Textarea
            maxLength={500}
            isRequired
            required
            onChange={(e) => setCommentContent(e.target.value)}
            value={commentContent}
            placeholder="write your comment here..."
            radius="sm"
          />
          <Button
            onClick={handleAddComment}
            size="sm"
            variant="flat"
            color="primary"
          >
            Post Comment
          </Button>
        </div>
      </section>
    </div>
  );
}
