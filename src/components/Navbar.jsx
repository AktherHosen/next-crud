"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();

  return (
    <nav className="flex justify-between items-center  py-4 px-2 ">
      <h3 className="font-semibold uppercase text-lg border py-1  pl-4 pr-2">
        Next <span className="bg-gray-600 text-white px-4 py-0.5 ">Crud</span>
      </h3>
      <ul className="flex items-center gap-3">
        <li>
          <Link
            className={`${pathName === "/" && "underline underline-offset-4 "}`}
            href={"/"}
          >
            Home
          </Link>
        </li>
        <li
          className={`${
            pathName === "/todo/add-todo" && "underline underline-offset-4 "
          }`}
        >
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
                className={`${
                  pathName === "/login" && "underline underline-offset-4 "
                }`}
                href={"/api/auth/signin"}
              >
                Login
              </Link>
              <Link
                href={"/api/auth/signup"}
                className={`ml-3 ${
                  pathName === "/login" ? "underline underline-offset-4 " : ""
                }`}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-gray-600 text-white uppercase text-sm px-4 py-1 rounded-sm"
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
