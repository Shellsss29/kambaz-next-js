"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountNavigation() {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  const pathname = usePathname()?.toLowerCase();

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname?.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      {currentUser?.role === "ADMIN" && (
        <NavItem>
          <NavLink
            as={Link}
            href="/Account/Users"
            active={pathname?.endsWith("users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}
