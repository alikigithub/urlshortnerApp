"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { emailSent } from "@/store/slice/userSlice";

export default function useForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleForGet = async () => {
    try {
      setLoading(true);
      if (email.trim() === "") {
        toast.error("Please enter email");
        return;
      }
      await dispatch(emailSent({ email: email })).unwrap();
      toast.success("Email has been sent to Your Email");
      setEmail("");
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    handleForGet,
    loading,
  };
}
