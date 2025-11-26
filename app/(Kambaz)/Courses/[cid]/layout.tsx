"use client";

import { ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import type { RootState } from "../../store";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
}

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

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrolled } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as {
    currentUser: User | null;
  };
  const course = (courses as Course[]).find((c) => c._id === cid);

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    if (enrolled === undefined || enrolled === null) {
      return;
    }

    const isFaculty = currentUser.role === "FACULTY";
    const isEnrolled =
      Array.isArray(enrolled) && enrolled.includes(cid as string);

    if (!isFaculty && !isEnrolled) {
      router.push("/Dashboard");
    }
  }, [cid, enrolled, currentUser, router]);

  return (
    <div id="wd-courses" className="p-3">
      <h2
        className="text-danger d-flex align-items-center"
        style={{ paddingLeft: "145px", paddingTop: "10px" }}
      >
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          role="button"
          onClick={() => setShowNav(!showNav)}
          title="Toggle navigation"
        />
        {course?.name || "Course"}
      </h2>
      <hr />

      <div className="d-flex">
        {showNav && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill ps-3">{children}</div>
      </div>
    </div>
  );
}
