const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findMyEnrollments = async () => {
  const response = await fetch(`${ENROLLMENTS_API}/current`, {
    credentials: "include",
  });
  return response.json();
};

export const enrollInCourse = async (courseId: string) => {
  const response = await fetch(`${ENROLLMENTS_API}/${courseId}`, {
    method: "POST",
    credentials: "include",
  });
  return response.json();
};

export const enrollStudentInCourse = async (
  courseId: string,
  userId: string
) => {
  const resp = await fetch(
    `${HTTP_SERVER}/api/enrollments/${courseId}/${userId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  return resp.json();
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await fetch(`${ENROLLMENTS_API}/${courseId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await fetch(`${COURSES_API}/${courseId}/users`, {
    credentials: "include",
  });
  return response.json();
};

export const removeUserFromCourse = async (
  courseId: string,
  userId: string
) => {
  await fetch(`${ENROLLMENTS_API}/${courseId}/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
