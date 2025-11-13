"use client";
import { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as enrollClient from "../../../../Enrollments/client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
}

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await enrollClient.findUsersForCourse(cid as string);
        setUsers(data);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [cid]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div id="wd-people-table" className="p-4">
      <h3 className="mb-4">People in this Course ({users.length})</h3>
      {users.length === 0 ? (
        <p className="text-muted">No users enrolled in this course yet.</p>
      ) : (
        <Table striped responsive bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Section</th>
              <th>Last Activity</th>
              <th>Total Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-3 text-secondary" />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role ?? "STUDENT"}</td>
                <td>{user.section ?? "-"}</td>
                <td>{user.lastActivity ?? "-"}</td>
                <td>{user.totalActivity ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
