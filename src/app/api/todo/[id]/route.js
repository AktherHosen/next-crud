import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const GET = async (request, { params }) => {
  const id = params.id;

  // Validate the ID
  if (!id || !ObjectId.isValid(id)) {
    return new NextResponse(JSON.stringify({ message: "Invalid ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const db = await connectDB();
    const todosCollection = await db.collection("todos");
    const todo = await todosCollection.findOne({ _id: new ObjectId(id) });

    if (!todo) {
      return new NextResponse(JSON.stringify({ message: "Todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify(todo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
