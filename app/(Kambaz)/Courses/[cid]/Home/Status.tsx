import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaBullhorn } from "react-icons/fa";
import { BiImport, BiHome, BiBarChartAlt2 } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoNotifications } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
    return (
        <div id="wd-course-status" className="w-100">
            <h2>Course Status</h2>

            {/* Publish / Unpublish */}
            <div className="d-flex flex-wrap">
                <div className="flex-fill pe-1 mb-2">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-100 text-nowrap"
                    >
                        <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
                    </Button>
                </div>
                <div className="flex-fill mb-2">
                    <Button variant="success" size="lg" className="w-100">
                        <FaCheckCircle className="me-2 fs-5" /> Publish
                    </Button>
                </div>
            </div>

            {/* Other buttons */}
            <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
                <BiImport className="me-2 fs-5" /> Import Existing Content
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
                <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
                <BiHome className="me-2 fs-5" /> Choose Home Page
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
                <RiDashboardLine className="me-2 fs-5" /> View Course Stream
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
                <FaBullhorn className="me-2 fs-5" /> New Announcement
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
                <BiBarChartAlt2 className="me-2 fs-5" /> New Analytics
            </Button>
            <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
                <IoNotifications className="me-2 fs-5" /> View Course Notifications
            </Button>
        </div>
    );
}
