"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import {
  BsGripVertical,
  BsThreeDotsVertical,
  BsPlus,
  BsSearch,
} from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

export default function Assignments() {
  const { cid } = useParams(); // Course ID from URL
  const assignments = db.assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" style={{ padding: "20px" }}>
      {/* Top controls */}
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
          <button
            id="wd-add-assignment-group"
            className="btn btn-secondary me-2"
          >
            <BsPlus className="me-1" /> Group
          </button>
          <button id="wd-add-assignment" className="btn btn-danger">
            <BsPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      {/* Header */}
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

      {/* Assignment list */}
      <ul id="wd-assignment-list" className="list-group rounded-0">
        {assignments.map((a) => (
          <li
            key={a._id}
            className="wd-assignment-list-item list-group-item p-3 border-start border-success border-4"
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Link
                  href={`/Courses/${cid}/Assignments/${a._id}`}
                  className="wd-assignment-link fw-bold fs-5 text-decoration-none text-black"
                >
                  {a.title}
                </Link>
                <div className="text-muted small">
                  <b>Course:</b> {a.course}
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

      {assignments.length === 0 && (
        <p className="text-muted mt-3">No assignments found for this course.</p>
      )}
    </div>
  );
}
