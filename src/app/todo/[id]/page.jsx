"use client";

import TodoEdit from "@/components/TodoEdit";
import React, { useEffect, useState } from "react";

const TodoEditPage = ({ params }) => {
  const id = React.use(params).id;
  const [todo, setTodo] = useState([]);
  console.log("signlke", id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Edit Todo</h3>
      <TodoEdit todo={todo} id={todo?._id} />
    </div>
  );
};

export default TodoEditPage;
