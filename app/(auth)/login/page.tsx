// app/(auth)/login/page.tsx
import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = { title: "Sign in | BlitzCart" };

export default function Page() {
  return <LoginClient />;
}