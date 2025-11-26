"use client";
import { User } from "../../../types/User";

interface PeopleTableProps {
  users: User[];
  onSelectUser: (uid: string) => void;
}

export default function PeopleTable({ users, onSelectUser }: PeopleTableProps) {
  return (
    <div id="wd-people-table">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Username</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
