"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  type Course,
} from "../Courses/reducer";
import { enrollCourse, unenrollCourse } from "../Enrollments/reducer";
import type { RootState, AppDispatch } from "../store";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: User | null };

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrolled } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "NEW100",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "D123",
    credits: 3,
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  const handleAdd = () => {
    const newCourse: Course = { ...course, _id: uuidv4() };
    dispatch(addNewCourse(newCourse));
    dispatch(enrollCourse(newCourse._id ?? ""));
  };

  const handleUpdate = () => {
    dispatch(updateCourse(course));
  };

  const handleDelete = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };

  const handleEdit = (selectedCourse: Course) => {
    setCourse(selectedCourse);
  };

  const toggleEnrollmentsView = () => {
    setShowAllCourses((prev) => !prev);
  };

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c) => enrolled.includes(c._id ?? ""));

  return (
    <div id="wd-dashboard" className="p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={toggleEnrollmentsView}
          id="wd-enrollments-toggle"
        >
          {showAllCourses ? "Show My Courses" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New / Edit Course
            <Button
              variant="primary"
              className="float-end ms-2"
              id="wd-add-new-course-click"
              onClick={handleAdd}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              id="wd-update-course-click"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </h5>
          <br />
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            className="mb-2"
            as="textarea"
            rows={3}
            placeholder="Description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({visibleCourses.length}
        )
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c) => {
            const isEnrolled = enrolled.includes(c._id ?? "");

            return (
              <Col key={c._id ?? uuidv4()} style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={
                      isEnrolled ? `/Courses/${c._id ?? ""}/Home` : "/Dashboard"
                    }
                    className="text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      style={{
                        backgroundColor: "#a73f28ff",
                        width: "100%",
                        height: "160px",
                      }}
                      src={c.image || "/images/reactjs.jpg"}
                    />
                    <CardBody>
                      <CardTitle className="text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>

                      <div className="d-flex justify-content-between align-items-center">
                        {isEnrolled ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(unenrollCourse(c._id ?? ""));
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(enrollCourse(c._id ?? ""));
                            }}
                          >
                            Enroll
                          </Button>
                        )}

                        {currentUser?.role === "FACULTY" && (
                          <div>
                            <Button
                              variant="warning"
                              size="sm"
                              className="me-2"
                              id="wd-edit-course-click"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(c);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              id="wd-delete-course-click"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(c._id ?? "");
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>

        {visibleCourses.length === 0 && (
          <p className="text-muted mt-3">
            {showAllCourses
              ? "No courses available."
              : "You are not enrolled in any courses."}
          </p>
        )}
      </div>
    </div>
  );
}
