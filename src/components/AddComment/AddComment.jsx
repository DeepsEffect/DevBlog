"use client";
import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

export default function AddComment() {
  const [commentContent, setCommentContent] = useState("");

  // handle add comment
  const handleAddComment = () => {
    console.log(commentContent);
  };

  return (
    <div>
      {/* add comments section */}
      <section className="mt-4 mb-20">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Add a comment: </h2>
          <Textarea
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
