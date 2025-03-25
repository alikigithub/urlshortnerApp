import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { changePassword } from "@/store/slice/userSlice";

export function useChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const dispatch = useAppDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleForGet = async () => {
    try {
      if (
        !oldPassword.trim() ||
        !newpassword.trim() ||
        !confirmPassword.trim()
      ) {
        return toast.error("Please Data in Each Field");
      }
      if (newpassword !== confirmPassword) {
        return toast.error("Passwords are not Same");
      }
      if (newpassword.length < 5) {
        return toast.error("password Lengh must be 5 or more then 5");
      }
      await dispatch(changePassword({ oldPassword, newpassword })).unwrap();
      toast.success("Password Has been Changes");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error as string);
    }
  };
  return {
    handleForGet,
    setNewPassword,
    setConfirmPassword,
    setOldPassword,
    newpassword,
    confirmPassword,
    oldPassword,
  };
}
