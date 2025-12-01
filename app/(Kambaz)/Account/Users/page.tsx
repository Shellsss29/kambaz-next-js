"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button, Form } from "react-bootstrap";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

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

  const handleDelete = useCallback(
    async (uid: string) => {
      setUsers((prev) => prev.filter((u) => String(u._id) !== String(uid)));

      try {
        const res = await fetch(`/api/users/${encodeURIComponent(uid)}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          alert("Failed to delete user on server. Reloading list.");
          fetchUsers();
        }
      } catch {
        alert("Network error while deleting user. Reloading list.");
        fetchUsers();
      }
    },
    [fetchUsers]
  );

  const handleAddPerson = async () => {
    if (!newUserForm.firstName.trim()) {
      alert("First name is required");
      return;
    }

    if (!newUserForm.username.trim()) {
      alert("Username is required");
      return;
    }

    if (!newUserForm.password.trim()) {
      alert("Password is required");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const tempUser: User = {
      _id: tempId,
      firstName: newUserForm.firstName,
      lastName: newUserForm.lastName,
      username: newUserForm.username,
      email: newUserForm.email,
      password: newUserForm.password,
      role: newUserForm.role as User["role"],
    } as User;

    setUsers((prev) => [tempUser, ...prev]);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: newUserForm.firstName,
          lastName: newUserForm.lastName,
          username: newUserForm.username,
          email: newUserForm.email,
          password: newUserForm.password,
          role: newUserForm.role,
        }),
      });

      if (!res.ok) {
        alert("Failed to create user on server. Reloading list.");
        fetchUsers();
        setShowAddModal(false);
        return;
      }

      const created: User = await res.json();

      setUsers((prev) => prev.map((u) => (u._id === tempId ? created : u)));
      setShowAddModal(false);
      setNewUserForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        role: "USER",
      });
    } catch {
      alert("Network error while creating user. Reloading list.");
      fetchUsers();
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewUserForm({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "USER",
    });
  };

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  // Fetch users when currentUser changes (initial load)
  useEffect(() => {
    if (currentUser && currentUser.role === "ADMIN") {
      fetchUsers();
    }
  }, [currentUser, fetchUsers]);

  // Refetch when search or role filters change
  useEffect(() => {
    if (currentUser && currentUser.role === "ADMIN") {
      fetchUsers();
    }
  }, [search, role, currentUser, fetchUsers]);

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
        </select>

        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          style={{ maxWidth: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {currentUser && currentUser.role === "ADMIN" && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            style={{ marginLeft: "8px" }}
          >
            +People
          </button>
        )}
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <PeopleTable
            users={users}
            onSelectUser={(uid) => setSelectedUser(uid)}
            onDeleteUser={handleDelete}
            isAdmin={currentUser && currentUser.role === "ADMIN"}
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

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newUserForm.firstName}
                onChange={(e) =>
                  setNewUserForm({
                    ...newUserForm,
                    firstName: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newUserForm.lastName}
                onChange={(e) =>
                  setNewUserForm({
                    ...newUserForm,
                    lastName: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={newUserForm.username}
                onChange={(e) =>
                  setNewUserForm({
                    ...newUserForm,
                    username: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUserForm.email}
                onChange={(e) =>
                  setNewUserForm({
                    ...newUserForm,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={newUserForm.password}
                onChange={(e) =>
                  setNewUserForm({
                    ...newUserForm,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={newUserForm.role}
                onChange={(e) =>
                  setNewUserForm({
                    ...newUserForm,
                    role: e.target.value,
                  })
                }
              >
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="TA">TA</option>
                <option value="STUDENT">Student</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddPerson}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
