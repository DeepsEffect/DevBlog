import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // parse the blog from body
    const blog = await request.json();

    // connect to db
    const db = await connectDB();

    // see if bookmark already exists for the user
    const alreadyExits = await db
      .collection("bookmarks")
      .findOne({
        blogId: blog.blogId,
        "bookmarkedBy.email": blog.bookmarkedBy.email,
      });

    if (alreadyExits) {
      return NextResponse.json(
        { message: "Already Bookmarked" },
        { status: 409 }
      );
    }
    // insert bookmark to db
    await db.collection("bookmarks").insertOne(blog);
    return NextResponse.json({ message: "bookmark added" }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
};
