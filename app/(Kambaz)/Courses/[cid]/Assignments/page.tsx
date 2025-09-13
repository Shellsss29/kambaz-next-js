import Link from "next/link";

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

    export default function Assignments({
    params,
    }: {
    params: { cid: string };
    }) {
    const { cid } = params;

    return (
        <div id="wd-assignments">
        <input placeholder="Search for Assignments" id="wd-search-assignment" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>

        <h3 id="wd-assignments-title">
            ASSIGNMENTS 40% of Total <button>+</button>
        </h3>

        <ul id="wd-assignment-list">
            {ASSIGNMENTS.map((a) => (
            <li key={a.id} className="wd-assignment-list-item">
                <Link
                href={`/Courses/${cid}/Assignments/${a.id}`}
                className="wd-assignment-link"
                >
                {a.title}
                </Link>
                <br />
                <span>Multiple Modules | </span>
                <b>Not available until</b>&nbsp;{a.notAvailableUntil}
                <span> | </span>
                <b>Due</b>&nbsp;{a.due}
                <span> | </span>
                {a.points} pts
            </li>
            ))}
        </ul>
        </div>
    );
}
