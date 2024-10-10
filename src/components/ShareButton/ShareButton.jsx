"use client";
import { Button, Tooltip } from "@nextui-org/react";
import { Share } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

export const ShareButton = ({ blog, readingTime }) => {
  // handle share blog
  const handleShareBlog = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Check out this blog: ${blog.title}`,
        url: `${window.location.origin}/blogs/${blog.slug}?readingTime=${readingTime}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(
          `${window.location.origin}/blogs/${blog.slug}?readingTime=${readingTime}`
        )
        .then(() => {
          toast.success("Blog link copied to clipboard!");
        })
        .catch((error) => {
          toast.error("Failed to copy link");
          console.error("Error copying to clipboard", error);
        });
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="share blog">
        <Button onClick={handleShareBlog} variant="flat" size="sm" isIconOnly>
          <Share className="hover:text-green-400" strokeWidth={2} size={21} />
        </Button>
      </Tooltip>
    </div>
  );
};
