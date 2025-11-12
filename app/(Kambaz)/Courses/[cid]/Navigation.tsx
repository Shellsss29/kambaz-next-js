"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const cid = segments[2];

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const href =
          link === "People"
            ? `/Courses/${cid}/People/Table`
            : `/Courses/${cid}/${link}`;
        const isActive =
          pathname.includes(`/${link}`) ||
          (link === "People" && pathname.includes("/People/Table"));

        return (
          <Link
            key={link}
            href={href}
            className={`list-group-item border-0 ${
              isActive ? "active text-white bg-danger" : "text-danger"
            }`}
            id={`wd-course-${link.toLowerCase()}-link`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
