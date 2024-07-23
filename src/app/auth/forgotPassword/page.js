"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const password = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/forgotPassword");
  }, []);

  return null;
};

export default password;
