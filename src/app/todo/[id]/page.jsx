"use client";

import TodoEdit from "@/components/TodoEdit";
import React, { useEffect, useState } from "react";

const TodoEditPage = ({ params }) => {
  const { id } = React.use(params);
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch todo");
        }
        const todoData = await res.json();
        setTodo(todoData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="w-[350px] px-2 py-2 border space-y-2">
        <h1 className="font-semibold uppercase">Update Todo</h1>
        <TodoEdit todo={todo} id={todo?._id} />
      </div>
    </div>
  );
};

export default TodoEditPage;
