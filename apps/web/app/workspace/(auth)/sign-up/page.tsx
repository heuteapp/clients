"use client";

import SignInCard from "@/src/ui/components/workspace/(auth)/sign-in/SignInCard";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  return (
    <SignInCard/>
  );
};

export default SignInPage;