import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  try {
    const { slug, comment } = await request.json();

    // validate input
    if (!slug || !comment || !comment.comment.trim()) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // connect to database
    const db = await connectDB();
    const blogs = await db.collection("blogs");

    // add comment to the blog's comment array
    const updateResult = await blogs.updateOne(
      { slug },
      {
        $push: {
          comments: {
            ...comment,
            postedDate: new Date().toISOString(),
          },
        },
        $inc: {
          "reactions.comments": 1,
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
};
