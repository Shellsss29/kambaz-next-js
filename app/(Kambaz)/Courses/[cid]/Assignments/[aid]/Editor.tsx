"use client";

import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" style={{ marginLeft: "120px", padding: "20px", maxWidth: "800px" }}>
            <h2>Edit Assignment</h2>

            <Form>
                {/* Assignment Name */}
                <Form.Group className="mb-3" controlId="wd-name">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3" controlId="wd-description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        defaultValue="The assignment is available online. Submit a link to the landing page of your work."
                    />
                </Form.Group>

                {/* Points */}
                <Form.Group as={Row} className="mb-3" controlId="wd-points">
                    <Form.Label column sm={3} className="text-end">
                        Points
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control type="number" defaultValue={100} />
                    </Col>
                </Form.Group>

                {/* Assignment Group */}
                <Form.Group as={Row} className="mb-3" controlId="wd-group">
                    <Form.Label column sm={3} className="text-end">
                        Assignment Group
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                {/* Display Grade as */}
                <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
                    <Form.Label column sm={3} className="text-end">
                        Display Grade as
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select defaultValue="Points">
                            <option>Points</option>
                            <option>Percentage</option>
                            <option>Complete/Incomplete</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                {/* Submission Type */}
                <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
                    <Form.Label column sm={3} className="text-end">
                        Submission Type
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select defaultValue="Online">
                            <option>Online</option>
                            <option>On Paper</option>
                            <option>No Submission</option>
                        </Form.Select>

                        <div className="mt-2 ms-3">
                            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" defaultChecked />
                            <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
                            <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                            <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                            <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
                        </div>
                    </Col>
                </Form.Group>

                {/* Assign To */}
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
                        <Form.Group controlId="wd-due-date">
                            <Form.Label>Due</Form.Label>
                            <Form.Control type="date" defaultValue="2025-05-13" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="wd-available-from">
                            <Form.Label>Available from</Form.Label>
                            <Form.Control type="date" defaultValue="2025-05-06" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="wd-available-until">
                            <Form.Label>Until</Form.Label>
                            <Form.Control type="date" defaultValue="2025-05-27" />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Buttons */}
                <div className="mt-4 d-flex justify-content-end">
                    <Button variant="secondary" className="me-2">Cancel</Button>
                    <Button variant="danger">Save</Button>
                </div>
            </Form>
        </div>
    );
}
