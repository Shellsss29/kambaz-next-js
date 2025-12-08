import type { Course } from "./types";

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export interface Module {
  _id?: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export interface Lesson {
  _id?: string;
  name: string;
  module: string;
}

export interface Assignment {
  _id?: string;
  title: string;
  description?: string;
  dueDate?: string;
  course: string;
  [key: string]: unknown;
}

export const fetchAllCourses = async (): Promise<Course[]> => {
  const response = await fetch(COURSES_API, { credentials: "include" });
  return response.json();
};

export const findMyCourses = async (): Promise<Course[]> => {
  const response = await fetch(`${USERS_API}/current/courses`, {
    credentials: "include",
  });
  return response.json();
};

export const createCourse = async (course: Course): Promise<Course> => {
  const response = await fetch(`${USERS_API}/current/courses`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return response.json();
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const response = await fetch(`${COURSES_API}/${course._id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return response.json();
};

export const deleteCourse = async (
  id: string
): Promise<{ message: string }> => {
  const response = await fetch(`${COURSES_API}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const response = await fetch(`${COURSES_API}/${courseId}/modules`, {
    credentials: "include",
  });
  return response.json();
};

export const createModuleForCourse = async (
  courseId: string,
  module: Module
): Promise<Module> => {
  const response = await fetch(`${COURSES_API}/${courseId}/modules`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(module),
  });
  return response.json();
};

export const deleteModule = async (
  moduleId: string
): Promise<{ message: string }> => {
  const response = await fetch(`${MODULES_API}/${moduleId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const updateModule = async (module: Module): Promise<Module> => {
  const response = await fetch(`${MODULES_API}/${module._id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(module),
  });
  return response.json();
};

export const findAssignmentsForCourse = async (
  courseId: string
): Promise<Assignment[]> => {
  const response = await fetch(`${COURSES_API}/${courseId}/assignments`, {
    credentials: "include",
  });
  return response.json();
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment
): Promise<Assignment> => {
  const response = await fetch(`${COURSES_API}/${courseId}/assignments`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignment),
  });
  return response.json();
};

export const updateAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const response = await fetch(`${ASSIGNMENTS_API}/${assignment._id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignment),
  });
  return response.json();
};

export const deleteAssignment = async (
  assignmentId: string
): Promise<{ message: string }> => {
  const response = await fetch(`${ASSIGNMENTS_API}/${assignmentId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};
