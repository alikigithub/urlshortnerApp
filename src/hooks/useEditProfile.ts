import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { editProfile } from "@/store/slice/userSlice";

export default function useEditProfile() {
  const [userName, setUserName] = useState("");
  const { data: sessionData } = useSession();
  const email = sessionData?.user?.email;
  const id = sessionData?.user.id;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sessionData?.user?.name) {
      setUserName(sessionData.user.name);
    }
  }, [sessionData]);

  const updateProfile = async () => {
    if (userName.trim() === "") {
      return toast.error("Please Enter UserName");
    }
    try {
      if (id) {
        dispatch(editProfile({ id, userName }));
      } else {
        toast.error("Login First");
      }
    } catch {}
  };

  return {
    email,
    userName,
    setUserName,
    updateProfile,
  };
}
