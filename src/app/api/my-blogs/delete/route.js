import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Ensure the ID is provided
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // connect to db
    const db = await connectDB();

    // find and delete blog
    const res = await db
      .collection("blogs")
      .findOneAndDelete({ _id: new ObjectId(id) });

    // If no blog is found, return a 404
    if (!res) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Successfully deleted
    return NextResponse.json(
      { message: "Blog deleted successfully", res },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
};
