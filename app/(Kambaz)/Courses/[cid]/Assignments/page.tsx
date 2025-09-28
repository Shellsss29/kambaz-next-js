import Link from "next/link";
import { BsGripVertical, BsThreeDotsVertical, BsPlus, BsSearch } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

type Assignment = {
    id: string;
    title: string;
    notAvailableUntil: string;
    due: string;
    points: number;
};

const ASSIGNMENTS: Assignment[] = [
    {
        id: "123",
        title: "A1 - ENV + HTML",
        notAvailableUntil: "May 6 at 12:00am",
        due: "May 13 at 11:59pm",
        points: 100,
    },
    {
        id: "124",
        title: "A2 - CSS + BOOTSTRAP",
        notAvailableUntil: "May 13 at 12:00am",
        due: "May 20 at 11:59pm",
        points: 100,
    },
    {
        id: "125",
        title: "A3 - JAVASCRIPT + REACT",
        notAvailableUntil: "May 20 at 12:00am",
        due: "May 27 at 11:59pm",
        points: 100,
    },
];

export default function Assignments({ params }: { params: { cid: string } }) {
    const { cid } = params;

    return (
        <div id="wd-assignments" style={{ marginLeft: "120px", padding: "20px" }}>
            {/* Search + Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="input-group" style={{ maxWidth: "400px" }}>
                    <span className="input-group-text">
                        <BsSearch />
                    </span>
                    <input
                        placeholder="Search for Assignments"
                        id="wd-search-assignment"
                        className="form-control"
                    />
                </div>
                <div>
                    <button id="wd-add-assignment-group" className="btn btn-secondary me-2">
                        <BsPlus className="me-1" /> Group
                    </button>
                    <button id="wd-add-assignment" className="btn btn-danger">
                        <BsPlus className="me-1" /> Assignment
                    </button>
                </div>
            </div>

            {/* Assignments header */}
            <h5
                id="wd-assignments-title"
                className="p-3 border d-flex justify-content-between align-items-center"
            >
                <span>
                    <BsGripVertical className="me-2" /> <strong>ASSIGNMENTS</strong>
                </span>
                <span>
                    <button className="btn btn-light btn-sm me-2">40% of Total</button>
                    <BsPlus />
                </span>
            </h5>

            {/* Assignment List */}
            <ul id="wd-assignment-list" className="list-group rounded-0">
                {ASSIGNMENTS.map((a) => (
                    <li
                        key={a.id}
                        className="wd-assignment-list-item list-group-item p-3 border-start border-success border-4"
                    >
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <Link
                                    href={`/Courses/${cid}/Assignments/${a.id}`}
                                    className="wd-assignment-link fw-bold fs-5 text-decoration-none text-black"
                                >
                                    {a.title}
                                </Link>
                                <div className="text-muted small">
                                    Multiple Modules | <b>Not available until</b> {a.notAvailableUntil}
                                    <br />
                                    <b>Due</b> <span className="text-danger">{a.due}</span> | {a.points} pts
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <FaCheckCircle className="text-success fs-4 me-3" />
                                <BsThreeDotsVertical className="fs-4" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
