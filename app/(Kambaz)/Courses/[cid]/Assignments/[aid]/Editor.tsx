"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as client from "../../../client";

interface Assignment {
  _id?: string;
  title: string;
  course: string | string[] | undefined;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

export default function AssignmentEditor() {
  const { cid } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    course: cid,
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    const fetchExisting = async () => {
      if (editId) {
        const assignments = await client.findAssignmentsForCourse(
          cid as string
        );
        const existing = assignments.find((a: Assignment) => a._id === editId);
        if (existing) setAssignment(existing);
      }
    };
    fetchExisting();
  }, [cid, editId]);

  const handleChange = <K extends keyof Assignment>(
    field: K,
    value: Assignment[K]
  ) => setAssignment({ ...assignment, [field]: value });

  const handleSave = async () => {
    try {
      if (editId) {
        await client.updateAssignment({
          ...assignment,
          course: String(assignment.course),
        });
      } else {
        const normalized = { ...assignment, course: String(assignment.course) };
        await client.createAssignmentForCourse(String(cid), normalized);
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Error saving assignment:", err);
    }
  };

  return (
    <div
      id="wd-assignment-editor"
      className="bg-white border rounded p-4"
      style={{
        padding: "20px",
        maxWidth: "800px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h4 className="fw-bold mb-4">
        {editId ? "Edit Assignment" : "New Assignment"}
      </h4>

      <Form.Group className="mb-4" controlId="wd-assignment-title">
        <Form.Label className="fw-semibold">Assignment Title</Form.Label>
        <Form.Control
          type="text"
          value={assignment.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="wd-description">
        <Form.Label className="fw-semibold">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={assignment.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add a short description..."
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-4" controlId="wd-points">
        <Form.Label column sm={3} className="text-end fw-semibold">
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            value={assignment.points ?? 100}
            onChange={(e) => handleChange("points", Number(e.target.value))}
          />
        </Col>
      </Form.Group>

      <h5 className="fw-semibold mb-3">Assign</h5>
      <div className="border rounded p-3">
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="wd-due">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                value={assignment.dueDate || ""}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available from</Form.Label>
              <Form.Control
                type="datetime-local"
                value={assignment.availableFrom || ""}
                onChange={(e) => handleChange("availableFrom", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="datetime-local"
                value={assignment.availableUntil || ""}
                onChange={(e) => handleChange("availableUntil", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <Button
          variant="secondary"
          className="me-2 px-4"
          onClick={() => router.push(`/Courses/${cid}/Assignments`)}
        >
          Cancel
        </Button>
        <Button variant="danger" className="px-4" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
