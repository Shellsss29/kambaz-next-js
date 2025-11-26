"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import PeopleDetails from "./Details";
import * as enrollClient from "../../../Enrollments/client";
import { User } from "../../../types/User";

export default function PeoplePage() {
    const { cid } = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const fetchPeople = async () => {
        const data = await enrollClient.findUsersForCourse(cid as string);
        setUsers(data);
    };

    useEffect(() => {
        fetchPeople();
    }, [cid]);

    return (
        <div className="p-3">
            <h2 className="mb-4 fw-bold">People</h2>

            <PeopleTable
                users={users}
                onSelectUser={(uid) => setSelectedUser(uid)}
            />

            {selectedUser && (
                <PeopleDetails
                    uid={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onUpdated={fetchPeople}   
                />
            )}
        </div>
    );
}
