"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { tableData, urlShortner } from "@/store/slice/urlSlice";

export function useDashboard() {
  const [originalLink, setOriginalLink] = useState("");
  const dispatch = useAppDispatch();
  const handleForGet = async () => {
    try {
      if (!originalLink.trim()) {
        return toast.error("Please Data in Each Field");
      }
      if (originalLink.trim().length <= 31) {
        return toast.error("Your Url is Already Short");
      }
      if (
        originalLink.startsWith("http://") ||
        originalLink.startsWith("https://")
      ) {
        const urlData = await dispatch(urlShortner({ originalLink })).unwrap();
        if (urlData) {
          dispatch(tableData());
          setOriginalLink("");
          return toast.success("Url Has been Short");
        }
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  return {
    handleForGet,
    originalLink,
    setOriginalLink,
  };
}
