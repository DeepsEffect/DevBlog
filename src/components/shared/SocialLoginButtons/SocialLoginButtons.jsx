"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function SocialLoginButtons() {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialSignIns = async (provider) => {
    try {
      setLoadingProvider(provider);
      const resp = await signIn(provider, { redirect: false });
      // console.log(resp);
    } catch (error) {
      console.error(`Error during ${provider} sign-in:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };
  return (
    <div className="space-y-3">
      {/* google button*/}
      <Button
        isLoading={loadingProvider === "google"}
        disabled={loadingProvider === "google"}
        onClick={() => handleSocialSignIns("google")}
        className="w-full"
      >
        <FcGoogle className="text-xl" />
        {loadingProvider === "google"
          ? "Signing in with Google"
          : "Continue with Google"}
      </Button>

      {/* GitHub button */}
      <Button
        isLoading={loadingProvider === "github"}
        disabled={loadingProvider === "github"}
        onClick={() => handleSocialSignIns("github")}
        className="w-full"
      >
        <FaGithub className="text-xl" />
        {loadingProvider === "github"
          ? "Signing in with GitHub"
          : "Continue with GitHub"}
      </Button>
    </div>
  );
}
