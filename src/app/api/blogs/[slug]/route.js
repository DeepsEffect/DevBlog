import { connectDB } from "@/lib/connectDB";

export const GET = async (request, { params }) => {
  try {
    // connect to the database
    const db = await connectDB();

    // fetch single blog data from the database
    const blog = await db.collection("blogs").findOne({ slug: params.slug });

    // Check if the blog was found
    if (!blog) {
      return new Response(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    // Return the found blog
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching blogs", error }),
      { status: 500 }
    );
  }
};
