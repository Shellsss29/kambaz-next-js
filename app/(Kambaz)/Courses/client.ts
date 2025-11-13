import axios from "axios";
import type { Course } from "./types";
const axiosWithCredentials = axios.create({ withCredentials: true });

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
  const { data } = await axiosWithCredentials.get<Course[]>(COURSES_API);
  return data;
};

export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get<Course[]>(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.post<Course>(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.put<Course>(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

export const deleteCourse = async (
  id: string
): Promise<{ message: string }> => {
  const { data } = await axiosWithCredentials.delete<{ message: string }>(
    `${COURSES_API}/${id}`
  );
  return data;
};

export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const { data } = await axiosWithCredentials.get<Module[]>(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: Module
): Promise<Module> => {
  const { data } = await axiosWithCredentials.post<Module>(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

export const deleteModule = async (
  moduleId: string
): Promise<{ message: string }> => {
  const { data } = await axiosWithCredentials.delete<{ message: string }>(
    `${MODULES_API}/${moduleId}`
  );
  return data;
};

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axiosWithCredentials.put<Module>(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
};

export const findAssignmentsForCourse = async (
  courseId: string
): Promise<Assignment[]> => {
  const { data } = await axiosWithCredentials.get<Assignment[]>(
    `${COURSES_API}/${courseId}/assignments`
  );
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axiosWithCredentials.post<Assignment>(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (
  assignment: Assignment
): Promise<Assignment> => {
  const { data } = await axiosWithCredentials.put<Assignment>(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (
  assignmentId: string
): Promise<{ message: string }> => {
  const { data } = await axiosWithCredentials.delete<{ message: string }>(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};
