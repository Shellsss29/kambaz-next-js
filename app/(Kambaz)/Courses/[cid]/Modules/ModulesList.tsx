"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    FormControl,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { RootState, AppDispatch } from "../../../store";
import { setModules, editModule, updateModule } from "./reducer";
import * as client from "../../client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import type { Module, Lesson } from "./reducer";

export default function ModulesList() {
    const { cid } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const [moduleName, setModuleName] = useState("");

    useEffect(() => {
        const loadModules = async () => {
            const data = await client.findModulesForCourse(cid as string);
            dispatch(setModules(data));
        };
        loadModules();
    }, [cid, dispatch]);

    const onCreateModuleForCourse = async () => {
        if (!moduleName.trim()) return;
        const newModule = { name: moduleName, course: cid as string };
        const created = await client.createModuleForCourse(cid as string, newModule);
        dispatch(setModules([...modules, created]));
        setModuleName("");
    };

    const onRemoveModule = async (moduleId: string) => {
        await client.deleteModule(moduleId);
        dispatch(setModules(modules.filter((m: Module) => m._id !== moduleId)));
    };

    const onUpdateModule = async (module: Module) => {
        await client.updateModule(module);
        const updatedModules = modules.map((m: Module) =>
            m._id === module._id ? module : m
        );
        dispatch(setModules(updatedModules));
    };

    return (
        <div id="wd-modules-page" className="p-4">
            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={onCreateModuleForCourse}
            />

            <br />

            <Row>
                <Col>
                    <ListGroup id="wd-modules" className="rounded-0">
                        {modules.map((module: Module) => (
                            <ListGroupItem
                                key={module._id}
                                className="wd-module p-0 mb-4 fs-5 border-gray"
                            >
                                <div className="wd-title p-3 ps-2 bg-secondary text-white d-flex justify-content-between align-items-center">
                                    <div>
                                        <BsGripVertical className="me-2 fs-3" />

                                        {!module.editing && module.name}

                                        {module.editing && (
                                            <FormControl
                                                className="w-50 d-inline-block"
                                                value={module.name}
                                                onChange={(e) =>
                                                    dispatch(
                                                        updateModule({ ...module, name: e.target.value })
                                                    )
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        onUpdateModule({ ...module, editing: false });
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>

                                    <ModuleControlButtons
                                        moduleId={module._id ?? ""}
                                        deleteModule={onRemoveModule}
                                        editModule={(id) => dispatch(editModule(id))}
                                    />
                                </div>

                                {module.lessons && module.lessons.length > 0 && (
                                    <ListGroup className="wd-lessons rounded-0">
                                        {module.lessons.map((lesson: Lesson) => (
                                            <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
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
