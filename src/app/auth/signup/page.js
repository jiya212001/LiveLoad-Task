"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/signup");
  }, []);

  return null;
};
export default Signup;
