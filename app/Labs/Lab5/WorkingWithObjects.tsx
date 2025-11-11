"use client";
import { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });

    const [moduleObj, setModuleObj] = useState({
        id: "M101",
        name: "Web Development",
        description: "Learn the basics of React and Node.js",
        course: "CS5610",
    });

    const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
    const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            <h4>Assignment</h4>

            <FormControl
                className="w-75 mb-2"
                id="wd-assignment-title"
                defaultValue={assignment.title}
                onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })
                }
            />
            <a
                id="wd-update-assignment-title"
                className="btn btn-primary me-2"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
            >
                Update Title
            </a>
            <hr />

            <h5>Score</h5>
            <FormControl
                type="number"
                className="w-25 mb-2"
                id="wd-assignment-score"
                defaultValue={assignment.score}
                onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })
                }
            />
            <a
                id="wd-update-assignment-score"
                className="btn btn-success me-2"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
            >
                Update Score
            </a>
            <hr />

            <h5>Completed</h5>
            <FormCheck
                type="checkbox"
                id="wd-assignment-completed"
                label="Completed"
                checked={assignment.completed}
                onChange={(e) =>
                    setAssignment({ ...assignment, completed: e.target.checked })
                }
            />
            <a
                id="wd-update-assignment-completed"
                className="btn btn-warning text-dark mt-2 me-2"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
            >
                Update Completed
            </a>

            <hr />

            <a
                id="wd-retrieve-assignment"
                className="btn btn-info text-white me-2"
                href={`${ASSIGNMENT_API_URL}`}
            >
                Get Assignment
            </a>
            <a
                id="wd-retrieve-assignment-title"
                className="btn btn-secondary"
                href={`${ASSIGNMENT_API_URL}/title`}
            >
                Get Title
            </a>

            <hr />

            <h4>Module</h4>
            <FormControl
                className="w-75 mb-2"
                id="wd-module-name"
                defaultValue={moduleObj.name}
                onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
            />
            <a
                id="wd-update-module-name"
                className="btn btn-primary me-2"
                href={`${MODULE_API_URL}/name/${moduleObj.name}`}
            >
                Update Module Name
            </a>

            <FormControl
                className="w-75 mb-2 mt-2"
                id="wd-module-description"
                defaultValue={moduleObj.description}
                onChange={(e) =>
                    setModuleObj({ ...moduleObj, description: e.target.value })
                }
            />
            <a
                id="wd-update-module-description"
                className="btn btn-warning text-dark me-2"
                href={`${MODULE_API_URL}/description/${moduleObj.description}`}
            >
                Update Module Description
            </a>

            <hr />
            <a
                id="wd-get-module"
                className="btn btn-success me-2"
                href={`${MODULE_API_URL}`}
            >
                Get Module
            </a>
            <a
                id="wd-get-module-name"
                className="btn btn-info text-white"
                href={`${MODULE_API_URL}/name`}
            >
                Get Module Name
            </a>

            <hr />
        </div>
    );
}
