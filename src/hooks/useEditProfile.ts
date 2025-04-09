import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { editProfile } from "@/store/slice/userSlice";

export default function useEditProfile() {
  const [userName, setUserName] = useState("");
  const { data: sessionData } = useSession();
  const [loading, setloading] = useState(false);
  const email = sessionData?.user?.email;
  const id = sessionData?.user.id;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sessionData?.user?.name) {
      setUserName(sessionData?.user?.name);
    }
  }, [sessionData]);

  const updateProfile = async () => {
    if (userName.trim() === "") {
      return toast.error("Please Enter UserName");
    }
    try {
      setloading(true);
      if (id) {
        const data = await dispatch(editProfile({ id, userName })).unwrap();

        if (data) {
          toast.success("Profile Updated");
        }
      } else {
        toast.error("Login First");
      }
    } catch {
    } finally {
      setloading(false);
    }
  };

  return {
    email,
    userName,
    setUserName,
    updateProfile,
    loading,
  };
}
