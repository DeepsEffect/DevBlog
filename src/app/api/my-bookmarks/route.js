import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // get the user email
    const email = "dipuahmed55@gmail.com";
    // connect to db
    const db = await connectDB();
    // find the bookmarks based on email
    const bookmarks = await db
      .collection("bookmarks")
      .find({ "bookmarkedBy.email": email })
      .toArray();
    if (!bookmarks || bookmarks.length === 0) {
      return NextResponse.json({ message: "no bookmark available" });
    }
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
};
