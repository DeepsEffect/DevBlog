export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
  console.log("API route called in production at:", new Date().toISOString());
  try {
    // connect to the database
    const db = await connectDB();

    // get all the blogs data from the database
    const blogs = await db.collection("blogs").find().toArray();
    return new Response(JSON.stringify(blogs), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching blogs", error }),
      { status: 500 }
    );
  }
};
