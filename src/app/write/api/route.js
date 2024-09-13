import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  try {
    // get the blogData
    const blogContent = await request.json();

    // Validate input
    if (!blogContent.blogTitle || !blogContent.blogContent) {
      return Response.json(
        { message: "Title and content are required." },
        { status: 400 }
      );
    }
    // connect to the database
    const db = await connectDB();

    // insert blogData to the database
    const result = await db.collection("blogs").insertOne({
      title: blogContent.blogTitle,
      content: blogContent.blogContent,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Blog posted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "something went wrong", error },
      { status: 500 } //internal server error
    );
  }
};
