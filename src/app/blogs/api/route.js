export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/connectDB";

export const GET = async (req) => {
  try {
    // connect to the database
    const db = await connectDB();

    // parse the query params
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // query for filtering
    const filter = category ? { category } : {};

    // get blogs data based on the filter query
    const blogs = await db.collection("blogs").find(filter).toArray();
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
