"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TodoEdit = ({ todo, id }) => {
  const [updatedTodo, setUpdatedTodo] = useState(todo.todo);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/edit-todo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, todo: updatedTodo }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        router.push("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError("Error updating todo: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          value={updatedTodo}
          className="px-4 py-2 border block w-full"
          onChange={(e) => setUpdatedTodo(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gray-600 px-2 py-1 mt-2 text-white "
        >
          Update Todo
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default TodoEdit;
