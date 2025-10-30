"use client";
import ReduxProvider from "./ReduxProvider";

export default function ReduxExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
