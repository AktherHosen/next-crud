"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();

  return (
    <nav className="flex justify-between items-center bg-red-600 py-4 px-2 text-white">
      <h3 className="font-bold">NextCrud</h3>
      <ul className="flex items-center gap-3">
        <li>
          <Link className={`${pathName === "/" && "underline"}`} href={"/"}>
            Home
          </Link>
        </li>
        <li className={`${pathName === "/todo" && "underline"}`}>
          <Link href={"/todo/add-todo"}>Add Todo</Link>
        </li>

        {session.status === "authenticated" && (
          <div className="flex items-center gap-x-4">
            <p className="text-xs">{session?.data?.user?.name}</p>
            <Image
              width={30}
              height={30}
              className="rounded-full"
              src={session?.data?.user?.image}
              alt="img"
            />
          </div>
        )}
        <li>
          {session.status !== "authenticated" ? (
            <>
              <Link
                className={`${pathName === "/login" && "underline"}`}
                href={"/api/auth/signin"}
              >
                Login
              </Link>
              <Link
                href={"/api/auth/signup"}
                className={`ml-3 ${pathName === "/login" ? "underline" : ""}`}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-red-500 px-2 py-1 rounded-md"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
