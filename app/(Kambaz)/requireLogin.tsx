"use client";

import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  const router = useRouter();

  useEffect(() => {
    if (currentUser === null) {
      router.push("Account/Signin");
    }
  }, [currentUser, router]);

  if (currentUser === null) return null;

  return <>{children}</>;
}
