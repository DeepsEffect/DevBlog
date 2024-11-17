"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { Clock } from "lucide-react";

const fetchComments = async (slug) => {
  if (!slug) throw new Error("Slug is required");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data = await res.json();
  return data.comments || [];
};

const CommentSkeleton = () => (
  <Card className="mb-4" shadow="sm">
    <CardBody className="gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-default-200 animate-pulse" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-default-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-default-200 rounded animate-pulse" />
          </div>
          <div className="h-4 w-full bg-default-200 rounded animate-pulse mt-2" />
          <div className="h-4 w-3/4 bg-default-200 rounded animate-pulse mt-1" />
        </div>
      </div>
    </CardBody>
  </Card>
);

const ViewComments = ({ slug }) => {
  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => fetchComments(slug),
    retry: 2,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="mb-10 mt-4">
        <h2 className="text-xl font-semibold mb-4">Comments:</h2>
        {[1, 2, 3].map((i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-10 mt-4">
        <h2 className="text-xl font-semibold mb-4">Comments:</h2>
        <Card className="mb-4" shadow="none">
          <CardBody>
            <div className="flex items-center gap-2 text-danger">
              <span className="text-danger">⚠️</span>
              {error.message ||
                "Failed to load comments. Please try again later."}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-10 mt-4">
      <h2 className="text-xl font-semibold mb-4">Comments:</h2>
      {comments.length === 0 ? (
        <Card shadow="none">
          <CardBody>
            <p className="text-default-500">
              No comments yet. Be the first to comment!
            </p>
          </CardBody>
        </Card>
      ) : (
        comments.map((comment, index) => (
          <Card className="mb-4" shadow="none" key={index}>
            <CardBody>
              <section className="flex items-start gap-4">
                <Avatar
                  src={comment.image}
                  name={comment.user[0].toUpperCase()}
                  size="lg"
                  className="w-12 h-12"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-md text-default-500">
                      {comment.user}
                    </p>
                    <p className="text-sm flex items-center gap-1 text-default-400">
                      <Clock className="w-4 h-4" />
                      {new Date(comment.postedDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <p className="mt-1 text-base">{comment.comment}</p>
                </div>
              </section>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default ViewComments;
