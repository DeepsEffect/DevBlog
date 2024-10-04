import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const PUT = async (request) => {
  try {
    // Get ID from query params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Get update data from request body
    const updateDoc = await request.json();

    // Connect to database
    const db = await connectDB();

    // Update document
    const result = await db.collection("blogs").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateDoc } },
      {
        returnDocument: "after", // Return the updated document
      }
    );

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: result.value,
    });
  } catch (error) {
    console.error("Error during edit: ", error);

    // Handle specific errors
    if (error instanceof ObjectId.Error) {
      return NextResponse.json(
        { message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Server error during update" },
      { status: 500 }
    );
  }
};
