"use client";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) return <div>Assignment not found.</div>;

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
      {/* Assignment Name */}
      <Form.Group className="mb-4" controlId="wd-assignment-name">
        <Form.Label className="fw-semibold">Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue={assignment.title || ""} />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-4" controlId="wd-description">
        <Form.Control
          as="textarea"
          rows={10}
          defaultValue={`The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
          style={{
            whiteSpace: "pre-line",
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.95rem",
          }}
        />
      </Form.Group>

      {/* Points */}
      <Form.Group as={Row} className="mb-4" controlId="wd-points">
        <Form.Label column sm={3} className="text-end fw-semibold">
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="number" defaultValue={100} />
        </Col>
      </Form.Group>

      {/* Assign Section */}
      <h5 className="fw-semibold mb-3">Assign</h5>
      <div className="border rounded p-3">
        {/* Assign to */}
        <Form.Group as={Row} className="mb-3" controlId="wd-assign-to">
          <Form.Label column sm={3} className="text-end">
            Assign to
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" defaultValue="Everyone" />
          </Col>
        </Form.Group>

        {/* Dates */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="wd-due">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available from</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue="2024-05-06T00:00"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue="2024-05-27T23:59"
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Buttons */}
      <div className="mt-4 d-flex justify-content-end">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button
            variant="secondary"
            className="me-2 px-4"
            style={{ borderRadius: "6px" }}
          >
            Cancel
          </Button>
        </Link>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button
            variant="danger"
            className="px-4"
            style={{ borderRadius: "6px", backgroundColor: "#d32f2f" }}
          >
            Save
          </Button>
        </Link>
      </div>
    </div>
  );
}
