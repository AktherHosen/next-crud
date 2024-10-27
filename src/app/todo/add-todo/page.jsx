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
        console.log(data.message); // "To-do added successfully"
        event.target.reset(); // Clear the form
        router.push("/"); // Redirect to the my-todo page
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>Add a New To-Do</h1>
      <form onSubmit={handleAddTodo}>
        <div>
          <label className="block" htmlFor="todo">
            To-Do
          </label>
          <input
            className="border px-2 py-1"
            type="text"
            name="todo"
            placeholder="Enter a new task"
            required
          />
        </div>
        <button type="submit" className="px-4 py-1 bg-blue-500 mt-2 text-white">
          Add To-Do
        </button>
      </form>
    </div>
  );
};

export default TodoPage;
