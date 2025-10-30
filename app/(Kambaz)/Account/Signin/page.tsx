"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import type { AppDispatch } from "../../store";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const signin = () => {
    const users = db.users as User[];

    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <FormControl
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        Sign in
      </Button>
      <br />
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
