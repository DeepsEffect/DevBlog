import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    // TODO: email verification

    // connect to db
    const db = await connectDB();
    // find the blog data
    const blog = await db
      .collection("blogs")
      .findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json(
        { message: "No blog found" },
        {
          status: 404,
        }
      );
    }
    // return the data
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
};
