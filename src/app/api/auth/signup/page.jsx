"use client";
import { useState } from "react";

const Page = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      image: event.target.image.value,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup/new-user`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        setSuccess("User registered successfully!");
        event.target.reset();
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred during registration");
      }
    } catch (error) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div>
          <label className="block" htmlFor="name">
            Name
          </label>
          <input
            className="border px-2 py-1"
            type="text"
            name="name"
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="border px-2 py-1"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block" htmlFor="image">
            Image
          </label>
          <input
            type="text"
            className="border px-2 py-1"
            name="image"
            placeholder="Enter your image URL"
          />
        </div>
        <div>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="border px-2 py-1"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="px-4 py-1 bg-red-500 mt-2 text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default Page;
