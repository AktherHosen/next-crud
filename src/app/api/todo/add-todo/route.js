import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth/next";
import { authoptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  try {
    const session = await getServerSession(authoptions);
    console.log(session);
    if (!session || !session.user || !session.user.email) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await connectDB();
    const todosCollection = db.collection("todos");

    const { todo } = await request.json();

    if (!todo) {
      return new NextResponse(
        JSON.stringify({ message: "To-do content is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newTodo = {
      email: session.user.email,
      todo,
      completed: false,
      createdAt: new Date(),
    };

    await todosCollection.insertOne(newTodo);

    return new NextResponse(
      JSON.stringify({ message: "To-do added successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding to-do:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
