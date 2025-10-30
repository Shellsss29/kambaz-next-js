"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { v4 as uuidv4 } from "uuid";

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
}

export default function Modules() {
  const { cid } = useParams();

  const [modules, setModules] = useState<Module[]>(db.modules);
  const [moduleName, setModuleName] = useState("");

  const addModule = () => {
    if (!moduleName.trim()) return;
    const newModule: Module = {
      _id: uuidv4(),
      name: moduleName,
      course: cid as string,
      lessons: [],
    };
    setModules([...modules, newModule]);
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId: string) => {
    setModules(
      modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m))
    );
  };

  const updateModule = (updatedModule: Module) => {
    setModules(
      modules.map((m) => (m._id === updatedModule._id ? updatedModule : m))
    );
  };

  return (
    <div id="wd-modules-page" className="p-4">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
      <br />
      <Row>
        <Col>
          <ListGroup id="wd-modules" className="rounded-0">
            {modules
              .filter((module) => module.course === cid)
              .map((module) => (
                <ListGroupItem
                  key={module._id}
                  className="wd-module p-0 mb-4 fs-5 border-gray"
                >
                  <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />

                    {!module.editing && module.name}
                    {module.editing && (
                      <FormControl
                        className="w-50 d-inline-block"
                        onChange={(e) =>
                          updateModule({
                            ...module,
                            name: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateModule({
                              ...module,
                              editing: false,
                            });
                          }
                        }}
                        defaultValue={module.name}
                      />
                    )}

                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={deleteModule}
                      editModule={editModule}
                    />
                  </div>

                  {module.lessons && module.lessons.length > 0 && (
                    <ListGroup className="wd-lessons rounded-0">
                      {module.lessons.map((lesson) => (
                        <ListGroupItem
                          key={lesson._id}
                          className="wd-lesson p-3 ps-1"
                        >
                          <BsGripVertical className="me-2 fs-3" />
                          {lesson.name}
                          <LessonControlButtons />
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
