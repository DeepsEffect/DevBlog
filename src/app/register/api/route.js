import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const newUser = await request.json();
  try {
    // connect to db
    const db = await connectDB();
    const userCollection = db.collection("users");

    // check if user already exists
    const userExists = await userCollection.findOne({ email: newUser.email });
    if (userExists) {
      return Response.json(
        { message: "user already exists" },
        { status: 409 } // conflict
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(newUser.password, 14);

    // insert new user
    const resp = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
      createdAt: new Date(),
    });
    return Response.json(
      { message: "user created successfully" },
      { status: 201 } // created
    );

    // handle error
  } catch (error) {
    return Response.json(
      { message: "something went wrong", error },
      { status: 500 } //internal server error
    );
  }
};
