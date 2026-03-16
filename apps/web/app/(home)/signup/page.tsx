"use client";

import SignInCard from "@/src/ui/components/(home)/sign-in/SignInCard";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  return (
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", width: "100%", backgroundColor: "background.default" }}
    >
        <SignInCard/>
    </Stack>
  );
};

export default SignInPage;