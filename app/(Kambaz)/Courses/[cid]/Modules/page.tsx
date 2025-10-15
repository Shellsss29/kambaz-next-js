"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

// Match your Database schema (_id instead of id)
interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
}

export default function Modules() {
  const { cid } = useParams();
  const modules: Module[] = db.modules as Module[];

  return (
    <div id="wd-modules-page" style={{ padding: "20px" }}>
      <ModulesControls />
      <br />
      <br />
      <br />

      <Row>
        <Col xs={20} lg={18}>
          <ListGroup id="wd-modules" className="rounded-0">
            {modules
              .filter((module) => module.course === cid)
              .map((module) => (
                <ListGroupItem
                  key={module._id}
                  className="wd-module p-0 mb-5 fs-5 border-gray"
                >
                  <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" /> {module.name}{" "}
                    <ModuleControlButtons />
                  </div>
                  {module.lessons && (
                    <ListGroup className="wd-lessons rounded-0">
                      {module.lessons.map((lesson) => (
                        <ListGroupItem
                          key={lesson._id}
                          className="wd-lesson p-3 ps-1"
                        >
                          <BsGripVertical className="me-2 fs-3" />{" "}
                          {lesson.name} <LessonControlButtons />
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </ListGroupItem>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
