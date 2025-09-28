"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1>Profile</h1>
            <FormControl id="wd-username" defaultValue="alice" className="mb-2" />
            <FormControl
                id="wd-password"
                type="password"
                defaultValue="123"
                className="mb-2"
            />
            <FormControl id="wd-firstname" defaultValue="Alice" className="mb-2" />
            <FormControl id="wd-lastname" defaultValue="Wonderland" className="mb-2" />
            <FormControl id="wd-dob" type="date" className="mb-2" />
            <FormControl
                id="wd-email"
                type="email"
                defaultValue="alice@wonderland.com"
                className="mb-2"
            />
            <FormControl id="wd-role" defaultValue="User" className="mb-2" />

            <Link
                id="wd-signout-btn"
                href="/Account/Signin"
                className="btn btn-danger w-100 mt-2"
            >
                Signout
            </Link>
        </div>
    );
}
