import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const { id, todo } = await request.json();
  console.log("Received from client:", { id, todo });

  if (!id || !todo) {
    console.error("Invalid data:", { id, todo });
    return new NextResponse(JSON.stringify({ message: "Invalid data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const db = await connectDB();
    const todosCollection = await db.collection("todos");

    const result = await todosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { todo } }
    );

    if (result.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Todo not found or no changes made" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Todo updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
