"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  BsGripVertical,
  BsThreeDotsVertical,
  BsPlus,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import type { RootState, AppDispatch } from "../../../store";
import { deleteAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const courseAssignments = assignments.filter((a) => a.course === cid);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setShowConfirm(id);
  };

  const confirmDelete = () => {
    if (showConfirm) {
      dispatch(deleteAssignment(showConfirm));
      setShowConfirm(null);
    }
  };

  return (
    <div id="wd-assignments" style={{ padding: "20px" }}>
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

          <button
            id="wd-add-assignment"
            className="btn btn-danger"
            onClick={() => router.push(`/Courses/${cid}/Assignments/Editor`)}
          >
            <BsPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

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

      <ul id="wd-assignment-list" className="list-group rounded-0">
        {courseAssignments.map((a) => (
          <li
            key={a._id}
            className="wd-assignment-list-item list-group-item p-3 border-start border-success border-4"
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Link
                  href={`/Courses/${cid}/Assignments/Editor?id=${a._id}`}
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
                <BsTrash
                  className="fs-5 text-danger me-3"
                  role="button"
                  onClick={() => handleDelete(a._id!)}
                  title="Delete assignment"
                />
                <BsThreeDotsVertical className="fs-4" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {courseAssignments.length === 0 && (
        <p className="text-muted mt-3">No assignments found for this course.</p>
      )}

      {showConfirm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000 }}
        >
          <div className="bg-white p-4 rounded shadow text-center">
            <h5>Are you sure you want to delete this assignment?</h5>
            <div className="mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowConfirm(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
