"use client";

import { useEffect, useState, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as accountClient from "../../../Account/client";
import * as enrollClient from "../../../Enrollments/client";
import { User } from "../../../types/User";
import { useParams } from "next/navigation";

interface PeopleDetailsProps {
    uid: string | null;
    onClose: () => void;
    onUpdated?: () => void; 
    allowCourseRemoval?: boolean;
}

export default function PeopleDetails({
    uid,
    onClose,
    onUpdated,
    allowCourseRemoval = false,
}: PeopleDetailsProps) {
    const { cid } = useParams(); 
    const [user, setUser] = useState<User | null>(null);
    const [editing, setEditing] = useState(false);

    const fetchUser = useCallback(async () => {
        if (!uid) return;
        const result = await accountClient.findUserById(uid);
        setUser(result);
    }, [uid]);

    useEffect(() => {
        if (uid) fetchUser();
    }, [uid, fetchUser]);

    if (!uid || !user) return null;

    const saveUser = async () => {
        await accountClient.updateUser(user);
        setEditing(false);
        if (onUpdated) onUpdated();
    };

    const removeFromCourse = async () => {
        if (!cid) return;
        const ok = confirm("Remove this user from the course?");
        if (!ok) return;

        await enrollClient.removeUserFromCourse(cid as string, uid);
        if (onUpdated) onUpdated();
        onClose();
    };

    return (
        <div
            className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow"
            style={{ width: "360px", zIndex: 2000 }}
        >
            <button
                className="btn position-absolute end-0 top-0"
                onClick={onClose}
            >
                <IoCloseSharp className="fs-1" />
            </button>

            <div className="text-center mt-2">
                <FaUserCircle className="text-secondary fs-1" />
            </div>

            <hr />

            <div className="text-danger fs-4">
                {user.firstName} {user.lastName}
            </div>

            {!editing ? (
                <>
                    <div className="mt-3">
                        <b>Username:</b> {user.username}
                    </div>

                    <div className="mt-2">
                        <b>Email:</b> {user.email || "N/A"}
                    </div>

                    <div className="mt-2">
                        <b>Role:</b> {user.role}
                    </div>

                    <div className="mt-2">
                        <b>Login ID:</b> {user.loginId || "N/A"}
                    </div>

                    <div className="mt-2">
                        <b>Section:</b> {user.section || "N/A"}
                    </div>

                    <div className="mt-2">
                        <b>Last Activity:</b>{" "}
                        {user.lastActivity
                            ? new Date(user.lastActivity).toLocaleDateString()
                            : "N/A"}
                    </div>

                    <div className="mt-2">
                        <b>Total Activity:</b> {user.totalActivity || "N/A"}
                    </div>

                    <div className="mt-4 d-flex gap-2">
                        <button className="btn btn-primary" onClick={() => setEditing(true)}>
                            Edit
                        </button>

                        {allowCourseRemoval && (
                            <button className="btn btn-danger" onClick={removeFromCourse}>
                                Remove from Course
                            </button>
                        )}

                        <button className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <input
                        className="form-control mb-2"
                        value={user.firstName || ""}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        placeholder="First Name"
                    />

                    <input
                        className="form-control mb-2"
                        value={user.lastName || ""}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        placeholder="Last Name"
                    />

                    <input
                        className="form-control mb-2"
                        value={user.email || ""}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                    />

                    <select
                        className="form-select mb-3"
                        value={user.role}
                        onChange={(e) =>
                            setUser({ ...user, role: e.target.value as User["role"] })
                        }
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="TA">TA</option>
                        <option value="STUDENT">Student</option>
                        <option value="USER">User</option>
                    </select>

                    <div className="d-flex gap-2">
                        <button className="btn btn-success" onClick={saveUser}>
                            Save
                        </button>
                        <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
