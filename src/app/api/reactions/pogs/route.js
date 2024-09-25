import { connectDB } from "@/lib/connectDB";

export const PUT = async (req) => {
  try {
    // get the slug
    const { slug } = await req.json();
    // connect to db
    const db = await connectDB();
    // find and update blog reactions
    const blog = await db
      .collection("blogs")
      .findOneAndUpdate(
        { slug },
        { $inc: { "reactions.pogs": 1 } },
        { returnDocument: "after" }
      );
    return new Response(JSON.stringify({ message: "Pogged successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
