import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/current`);
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${ENROLLMENTS_API}/${courseId}`
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/${courseId}`
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return data;
};
