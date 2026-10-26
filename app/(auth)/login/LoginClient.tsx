// app/(auth)/login/LoginClient.tsx
"use client";
import { useRouter } from "next/navigation";
import LoginPage from "../../../components/LoginPage";

export default function LoginClient() {
  const router = useRouter();
  return (
    <LoginPage
      onLogin={async (data) => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Invalid email or password.");
        router.push("/");
      }}
    />
  );
}