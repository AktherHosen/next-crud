import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
export const GET = async (request) => {
  try {
    const db = await connectDB();
    const todosCollection = db.collection("todos");
    const todos = await todosCollection.find({}).toArray();

    return new NextResponse(JSON.stringify(todos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
