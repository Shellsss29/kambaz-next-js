"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table";
import PeopleDetails from "../../Courses/[cid]/People/Details";
import AccountNavigation from "../Navigation";
import {
  findAllUsers,
  findUsersByRole,
  findUsersByPartialName,
  profile,
} from "../client";
import { User } from "../../types/User";

export default function UsersPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const checkAccess = useCallback(async () => {
    try {
      const user = await profile();
      setCurrentUser(user);

      if (!user) return router.push("/Account/Signin");
      if (user.role !== "ADMIN") return router.push("/Account");
    } catch {
      router.push("/Account/Signin");
    }
  }, [router]);

  const fetchUsers = useCallback(async () => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    if (search.trim()) {
      setUsers(await findUsersByPartialName(search));
      return;
    }

    if (role) {
      setUsers(await findUsersByRole(role));
      return;
    }

    setUsers(await findAllUsers());
  }, [search, role, currentUser]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!currentUser) return <div className="p-5">Loading...</div>;

  return (
    <div
      id="wd-users-page"
      className="p-4"
      style={{ paddingLeft: "150px", paddingTop: "30px", maxWidth: "900px" }}
    >
      <div className="mb-4">
        <AccountNavigation />
      </div>

      <h2 className="fw-bold mb-4 text-danger">Users</h2>

      <div className="d-flex align-items-center gap-3 mb-4">
        <select
          className="form-select w-auto"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="TA">TA</option>
          <option value="STUDENT">Student</option>
          <option value="USER">User</option>
        </select>

        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          style={{ maxWidth: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <PeopleTable
            users={users}
            onSelectUser={(uid) => setSelectedUser(uid)}
          />
        </div>
      </div>

      {selectedUser && (
        <PeopleDetails
          uid={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdated={fetchUsers}
          allowCourseRemoval={false}
        />
      )}
    </div>
  );
}
