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
      setLoading(true);
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

      if (res.status === 200) {
        fetchTodos();
      } else {
        const data = await res.json();
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
    <div className="bg-gray-600 min-h-[400px] min-w-[800px] text-white w-[400px] mx-auto mt-4 flex flex-col items-center justify-start">
      <h1 className="font-semibold underline uppercase text-xl underline-offset-2 my-4">
        To-Do List
      </h1>

      {loading ? (
        <div className="flex justify-center min-h-[200px] min-w-[800px] flex-col items-center h-full py-4">
          <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-b-4 border-white"></div>
          <h1 className="text-sm mt-2">
            You need to signin to make task and view
          </h1>
        </div>
      ) : (
        <table className="w-full text-left border-separate">
          {session ? (
            todos.length > 0 ? (
              <>
                <thead>
                  <tr>
                    <th className="px-4 py-2">Task</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <tr key={todo._id} className="border-b">
                      <td className="px-4 py-2">{todo.todo}</td>
                      <td className="px-4 py-2">{todo.email}</td>
                      <td className="px-4 py-2 flex items-center gap-x-2">
                        <button>
                          <Link href={`/todo/${todo._id}`}>
                            <LuFolderEdit size={20} />
                          </Link>
                        </button>
                        <button onClick={() => handleDeleteTodo(todo._id)}>
                          <MdOutlineDelete size={22} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No todos available. Add some!
                  </td>
                </tr>
              </tbody>
            )
          ) : (
            <tbody>
              <tr>
                <td colSpan="3" className="text-center py-4">
                  Please log in to view your todos.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default Home;
