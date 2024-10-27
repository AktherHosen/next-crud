"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TodoPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/api/auth/signin");
    }
  }, [session, status, router]);

  const handleAddTodo = async (event) => {
    event.preventDefault();
    if (!session) {
      console.error("User is not logged in.");
      return alert("You must be logged in to add a to-do.");
    }

    const newTodo = {
      todo: event.target.todo.value,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/add-todo`,
        {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (res.status === 201) {
        console.log(data.message);
        event.target.reset();
        router.push("/");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="border px-2 py-2 space-y-2">
        <h1 className="font-semibold uppercase">TODO: </h1>
        <form onSubmit={handleAddTodo} className="w-[350px] space-y-3">
          <div>
            <label className="block" htmlFor="todo">
              Title
            </label>
            <input
              className="border px-2 py-1 w-full"
              type="text"
              name="todo"
              placeholder="Enter a new task"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1 bg-gray-600 mt-2 text-white my-2"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoPage;
