import connectDB from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const DELETE = async (request) => {
  const { id } = await request.json();
  console.log("Deleting todo with ID:", id);

  if (!id) {
    return new NextResponse(JSON.stringify({ message: "Invalid ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const db = await connectDB();
    const todosCollection = await db.collection("todos");

    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });

    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return new NextResponse(JSON.stringify({ message: "Todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Todo deleted successfully" }),
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
