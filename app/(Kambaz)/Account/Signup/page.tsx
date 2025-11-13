"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import type { AppDispatch } from "../../store";

type SignupUser = {
  username: string;
  password: string;
};

export default function Signup() {
  const [user, setUser] = useState<SignupUser>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      alert(axiosErr.response?.data?.message || "Sign-up failed");
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button
        onClick={signup}
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Button>
      <br />
      <Link id="wd-signin-link" href="/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}
