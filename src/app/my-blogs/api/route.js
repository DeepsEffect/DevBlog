import { connectDB } from "@/lib/connectDB";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) {
    return new Response(JSON.stringify({ message: "Email is required" }), {
      status: 400,
    });
  }
  console.log(email);
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
        JSON.stringify({ message: "No blogs found for this user" }),
        {
          status: 404,
        }
      );
    }
    return new Response(JSON.stringify(usersBlogs, { status: 200 }));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching blogs", error }),
      { status: 500 }
    );
  }
};
