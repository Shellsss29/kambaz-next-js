"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <Image
          src="/images/NEU.svg"
          alt="Northeastern University logo"
          width={75}
          height={75}
          priority
        />
      </ListGroupItem>

      <ListGroupItem className="text-center border-0 bg-black">
        <Link
          href="/Account"
          className={`d-block text-decoration-none ${
            pathname.includes("Account")
              ? "bg-white text-danger"
              : "bg-black text-white"
          }`}
        >
          <FaRegCircleUser
            className={`fs-1 ${
              pathname.includes("Account") ? "text-danger" : "text-white"
            }`}
          />
          <br />
          Account
        </Link>
      </ListGroupItem>

      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          className="text-center border-0 bg-black"
        >
          <Link
            href={link.path}
            className={`d-block text-decoration-none py-2 ${
              pathname.includes(link.label)
                ? "text-danger bg-white"
                : "text-white bg-black"
            }`}
          >
            <link.icon
              className={`fs-1 ${
                pathname.includes(link.label) ? "text-danger" : "text-white"
              }`}
            />
            <br />
            {link.label}
          </Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
