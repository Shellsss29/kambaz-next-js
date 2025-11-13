"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
import type { Course } from "../Courses/types";
import { setCourses } from "../Courses/reducer";
import type { RootState, AppDispatch } from "../store";
import * as courseClient from "../Courses/client";
import * as enrollClient from "../Enrollments/client";

interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role?: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
}

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: User | null };
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const [course, setCourse] = useState<Course>({
    _id: "",
    name: "New Course",
    number: "NEW100",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "D123",
    credits: 3,
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  const [enrolled, setEnrolled] = useState<string[]>([]);

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await courseClient.fetchAllCourses();

      const normalized = fetchedCourses.map((c) => ({
        _id: c._id ?? "",
        name: c.name ?? "Untitled Course",
        number: c.number ?? "UNKN100",
        startDate: c.startDate ?? "2025-01-01",
        endDate: c.endDate ?? "2025-05-01",
        description: c.description ?? "No description available.",
        department: c.department ?? "General",
        credits: typeof c.credits === "number" ? c.credits : 0,
        image: c.image ?? "/images/default.jpg",
      }));
      dispatch(setCourses(normalized));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const data = await enrollClient.findMyEnrollments();
      setEnrolled(data.map((c: Course) => c._id));
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser]);

  const onAddNewCourse = async () => {
    try {
      const newCourse = await courseClient.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      dispatch(
        setCourses(
          courses.map((c) => (c._id === course._id ? { ...c, ...course } : c))
        )
      );
      alert("Course updated!");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
      alert("Course deleted!");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollClient.enrollInCourse(courseId);
      setEnrolled([...enrolled, courseId]);
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await enrollClient.unenrollFromCourse(courseId);
      setEnrolled(enrolled.filter((id) => id !== courseId));
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  const handleEdit = (selectedCourse: Course) => setCourse(selectedCourse);

  return (
    <div id="wd-dashboard" className="p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
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
              onClick={onAddNewCourse}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
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

      <h2 id="wd-dashboard-published">Courses ({courses.length})</h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {courses.map((c) => {
          const isEnrolled = enrolled.includes(c._id ?? "");

          return (
            <Col key={c._id} style={{ width: "300px" }}>
              <Card>
                <Link
                  href={isEnrolled ? `/Courses/${c._id}/Home` : `/Dashboard`}
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
                      {currentUser?.role === "FACULTY" ? (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
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
                              onDeleteCourse(c._id ?? "");
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <>
                          {isEnrolled ? (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                handleUnenroll(c._id ?? "");
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
                                handleEnroll(c._id ?? "");
                              }}
                            >
                              Enroll
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>

      {courses.length === 0 && (
        <p className="text-muted mt-3">No courses available.</p>
      )}
    </div>
  );
}
