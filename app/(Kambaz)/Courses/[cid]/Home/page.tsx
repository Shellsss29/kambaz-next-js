"use client";

import ModulesList from "../Modules/ModulesList";
import CourseStatus from "./Status";

export default function Home() {
    return (
        <div id="wd-home">
            <div className="d-flex">
                <div className="flex-fill me-3">
                    <ModulesList />
                </div>

                <div className="d-none d-lg-block" style={{ width: "250px" }}>
                    <CourseStatus />
                </div>
            </div>
        </div>
    );
}
