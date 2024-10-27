import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    const newUser = await request.json();
    const existingUser = await usersCollection.findOne({
      email: newUser.email,
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const res = await usersCollection.insertOne(newUser);

    return new NextResponse(JSON.stringify({ message: "New user added" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
