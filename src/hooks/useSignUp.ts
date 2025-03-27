import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { signupUser } from "@/store/slice/userSlice";

export default function useSignUp() {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useAppDispatch();
  const inputhandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      if (!email || !userName || !password || !confirmPassword) {
        return toast.error("All fields are required.");
      }
      const emailcheck = /^\S+@\S+\.\S+$/;
      if (!emailcheck.test(email)) {
        return toast.error("Enter Valid Email please");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match.");
      }
      if (password.length < 5) {
        return toast.error("Password must be of 5 character or more");
      }

      const checkSignUp = await dispatch(
        signupUser({ userName, email, password })
      ).unwrap();
      if (checkSignUp) {
        toast.success("Account Created");
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setloading(false);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return {
    email,
    setEmail,
    userName,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    inputhandler,
    loading,
  };
}
