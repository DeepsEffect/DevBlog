import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
  try {
    // connect to the database
    const db = await connectDB();

    // get all the blogs data from the database
    const blogs = await db.collection("blogs").find().toArray();
    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate max-ago=0",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching blogs", error }),
      { status: 500 }
    );
  }
};
