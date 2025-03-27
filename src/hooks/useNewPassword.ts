"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { newPassword } from "@/store/slice/userSlice";

export default function useNewPassword() {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const handleForGet = async () => {
    if (password.trim() === "" || confirmPassword.trim() === "") {
      toast.error("Please enter password");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    try {
      setLoading(true);
      await dispatch(
        newPassword({ token: token, password: password })
      ).unwrap();
      setPassword("");
      setConfirmPassword("");
      toast.success("Your Password Has been Updated");
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };
  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setToken,
    handleForGet,
    loading,
  };
}
