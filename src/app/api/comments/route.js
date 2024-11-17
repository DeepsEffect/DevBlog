export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug"); 

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const blog = await db.collection("blogs").findOne({ slug });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const comments = blog.comments || []; 

    if (comments.length === 0) {
      return NextResponse.json(
        { message: "No comments available", comments: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Comments retrieved successfully", comments },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
