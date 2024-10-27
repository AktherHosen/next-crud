"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MdOutlineDelete } from "react-icons/md";

import { LuFolderEdit } from "react-icons/lu";
const Home = () => {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/get-todo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);

  const handleDeleteTodo = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/delete-todo`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await res.json();
      if (res.status === 200) {
        console.log(data.message);
        fetchTodos();
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-700 min-h-[400px] min-w-[600px] text-white w-[400px] mx-auto mt-4 flex flex-col items-center justify-start">
      <h1 className="font-semibold underline uppercase text-xl underline-offset-2 my-4">
        Your To-Do List
      </h1>
      {session ? (
        <>
          {todos.length > 0 ? (
            <ul className="w-full px-2">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex justify-around gap-2 w-full border my-1 py-1"
                >
                  <h3>{todo.todo}</h3>
                  <h3>{todo.email}</h3>
                  <div className="flex items-center gap-x-2">
                    <button>
                      <Link href={`/todo/${todo._id}`}>
                        <LuFolderEdit size={20} />
                      </Link>
                    </button>
                    <button onClick={() => handleDeleteTodo(todo._id)}>
                      <MdOutlineDelete size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>No todos available. Add some!</p>
          )}
        </>
      ) : (
        <p>Please log in to view your todos.</p>
      )}
    </div>
  );
};

export default Home;
