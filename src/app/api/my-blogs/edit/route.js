import { NextResponse } from "next/server";

export const PUT = (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);
  } catch (error) {
    console.log("error during edit: ", error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
};
