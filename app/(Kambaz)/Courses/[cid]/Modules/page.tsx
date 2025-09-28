"use client";

import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
    return (
        <div id="wd-modules-page" style={{ marginLeft: "120px", padding: "20px" }}>
            {/* Top Controls */}
            <ModulesControls />
            <br />
            <br />
            <br />

            <Row>
                {/* Left side: Modules list */}
                <Col xs={12} lg={8}>
                    <ListGroup className="rounded-0" id="wd-modules">
                        {/* Week 1 */}
                        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                                <span>
                                    <BsGripVertical className="me-2 fs-3" /> Week 1
                                </span>
                                <ModuleControlButtons />
                            </div>
                            <ListGroup className="wd-lessons rounded-0">
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> Introduction to the
                                        course
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> Learn what is Web
                                        Development
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>

                        {/* Week 2 */}
                        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                                <span>
                                    <BsGripVertical className="me-2 fs-3" /> Week 2
                                </span>
                                <ModuleControlButtons />
                            </div>
                            <ListGroup className="wd-lessons rounded-0">
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> Understand HTML basics
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> Build your first webpage
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> READING
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> MDN: Introduction to HTML
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> W3Schools: HTML Basics
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>

                        {/* Week 3 */}
                        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                                <span>
                                    <BsGripVertical className="me-2 fs-3" /> Week 3
                                </span>
                                <ModuleControlButtons />
                            </div>
                            <ListGroup className="wd-lessons rounded-0">
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> Learn CSS fundamentals
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> Style your webpage
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> ASSIGNMENT
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <span>
                                        <BsGripVertical className="me-2 fs-3" /> Create a styled homepage with CSS
                                    </span>
                                    <LessonControlButtons />
                                </ListGroupItem>
                            </ListGroup>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}
