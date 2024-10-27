import { getServerSession } from "next-auth";
import React from "react";
import { authoptions } from "../api/auth/[...nextauth]/route";

const Login = async () => {
  const session = await getServerSession(authoptions);
  console.log({ session });
  return (
    <div>
      <h1>This is login page</h1>
    </div>
  );
};

export default Login;
