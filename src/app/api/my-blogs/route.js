import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "email is required" }, { status: 400 });
  }
  try {
    // connect to DB
    const db = await connectDB();

    // find blogs by user's email
    const usersBlogs = await db
      .collection("blogs")
      .find({ "author.email": email })
      .toArray();

    // check if user's blogs were found
    if (!usersBlogs || usersBlogs.length === 0) {
      return new Response(
        JSON.stringify([], { message: "no blogs found for this user" }),
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(usersBlogs, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "server error" }, { status: 500 });
  }
};
