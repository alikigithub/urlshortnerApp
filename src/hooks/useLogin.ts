"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All Fields are Required");
      return;
    }
    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (loginData?.error) {
        toast.error(loginData.error);
        return;
      }
      toast.success("Welcome Your are login");
      router.replace("dashboard");
    } catch (error: unknown) {
      toast.error(String(error));
    } finally {
      setLoading(false);
      setEmail("");
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading,
  };
}
