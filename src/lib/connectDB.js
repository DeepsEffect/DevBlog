import { MongoClient, ServerApiVersion } from "mongodb";

let client = null;

export const connectDB = async () => {
  try {
    // Close the previous connection if it exists
    if (client) {
      await client.close();
    }

    const uri = process.env.MONGODB_URI;
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    const db = client.db("DevBlog");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
