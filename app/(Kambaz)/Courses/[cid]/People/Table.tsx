"use client";
import { User } from "../../../types/User";

interface PeopleTableProps {
  users: User[];
  onSelectUser: (uid: string) => void;
  onDeleteUser?: (uid: string) => void;
  isAdmin?: boolean;
}

export default function PeopleTable({ users, onSelectUser, onDeleteUser, isAdmin = false }: PeopleTableProps) {
  const handleDelete = (e: React.MouseEvent, uid: string) => {
    e.stopPropagation();
    const ok = confirm("Delete this user?");
    if (ok && onDeleteUser) {
      onDeleteUser(uid);
    }
  };

  return (
    <div id="wd-people-table">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Username</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="cursor-pointer"
              onClick={() => onSelectUser(user._id!)}
              style={{ cursor: "pointer" }}
            >
              <td className="text-nowrap text-primary">
                {user.firstName} {user.lastName}
              </td>
              <td>{user.role}</td>
              <td>{user.username}</td>
              {isAdmin && (
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => handleDelete(e, user._id!)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
