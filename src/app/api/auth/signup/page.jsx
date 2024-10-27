"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

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
        router.push("/api/auth/signin");
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred during registration");
      }
    } catch (error) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex items-center mt-4 justify-center">
      <div className="w-[400px]  border px-2 py-2 space-y-4">
        <h1 className="uppercase font-bold">Register</h1>
        <form onSubmit={handleRegister} className="space-y-2">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div>
            <label className="block" htmlFor="name">
              Name
            </label>
            <input
              className="border px-2 py-1 w-full"
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
              className="border px-2 py-1 w-full"
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
              className="border px-2 py-1 w-full"
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
              className="border px-2 py-1 w-full"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1 bg-gray-600 mt-2 text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
