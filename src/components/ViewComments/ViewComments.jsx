export const dynamic = "force-dynamic";
import { Avatar, Card } from "@nextui-org/react";
import { Clock } from "lucide-react";
import React from "react";

const ViewComments = async ({ slug }) => {
  try {
    //* Fetch the comments data
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments?slug=${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await res.json();
    const comments = data.comments || [];

    return (
      <div className="mb-10 mt-4">
        <div>
          <h2 className="text-xl font-semibold">Comments:</h2>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment, index) => (
              <Card shadow="none" className="mb-4 p-4" key={index}>
                <section className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar
                    src={comment.image}
                    alt={comment.user}
                    className="w-12 h-12 rounded-full"
                  />

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-md text-gray-400">
                          {comment.user}
                        </p>
                      </div>
                      <p className="text-sm flex items-center gap-1 text-gray-400">
                        <Clock width={20} />
                        {new Date(comment.postedDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                      {/* Display the date here */}
                    </div>
                    <p className="mt-1 text-base">{comment.comment}</p>
                  </div>
                </section>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    return (
      <div className="mb-20">
        <h2 className="text-xl font-semibold">Comments:</h2>
        <p>Failed to load comments.</p>
      </div>
    );
  }
};

export default ViewComments;
