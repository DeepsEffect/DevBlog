import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // Check if email is provided
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const bookmarks = await db
      .collection("bookmarks")
      .find({ "bookmarkedBy.email": email })
      .toArray();

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
