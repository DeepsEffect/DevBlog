import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    // get the user email
    const email = params.email;
    // connect to db
    const db = await connectDB();
    // find the bookmarks based on email
    const bookmarks = await db
      .collection("bookmarks")
      .find({ bookmarkBy: email })
      .toArray();
    if (!bookmarks) {
      return NextResponse.json({ message: "no bookmarks available" });
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
};
