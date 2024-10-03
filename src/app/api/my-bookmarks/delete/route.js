import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const bookmarkId = searchParams.get("bookmarkId");

    // validation
    if (!email || !bookmarkId) {
      return NextResponse.json(
        { message: "email and id are required" },
        { status: 400 }
      );
    }
    // validate bookmark id format
    if (!ObjectId.isValid(bookmarkId)) {
      return NextResponse.json(
        { message: "Invalid bookmark id format" },
        { status: 500 }
      );
    }
    // connect to db
    const db = await connectDB();

    // find and delete bookmark
    const result = await db.collection("bookmarks").findOneAndDelete({
      _id: new ObjectId(bookmarkId),
      "bookmarkedBy.email": email,
    });

    return NextResponse.json(
      {
        message: "Bookmark deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
