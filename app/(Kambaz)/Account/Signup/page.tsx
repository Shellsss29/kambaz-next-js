"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
        return (
                <div id="wd-signup-screen">
                        <h1>Signup</h1>
                        <FormControl
                                id="wd-username"
                                placeholder="username"
                                className="mb-2"
                        />
                        <FormControl
                                id="wd-password"
                                type="password"
                                placeholder="password"
                                className="mb-2"
                        />
                        <Link
                                id="wd-signup-btn"
                                href="/Account/Profile"
                                className="btn btn-primary w-100 mb-2"
                        >
                                Signup
                        </Link>
                        <br />
                        <Link id="wd-signin-link" href="/Account/Signin">
                                Signin
                        </Link>
                </div>
        );
}
