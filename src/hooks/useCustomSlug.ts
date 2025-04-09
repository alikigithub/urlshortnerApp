"use client";
import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "./useRedux";
import { customSlug } from "@/store/slice/urlSlice";

export function useCustomSlug() {
  const [originalLink, setOriginalLink] = useState("");
  const [cutomSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const autoSlug = () => {
    setCustomSlug(nanoid(4));
  };
  const shortNow = async () => {
    if (originalLink?.trim() === "") {
      return toast.error("Please Enter Link for Shorten");
    }
    if (
      !originalLink?.startsWith("http://") &&
      !originalLink?.startsWith("https://")
    ) {
      return toast.error("please enter Valid Url");
    }
    if (cutomSlug?.trim() === "") {
      return toast.error("Please enter Custom Slug");
    }
    try {
      setLoading(true);
      const url = await dispatch(
        customSlug({ originalLink, cutomSlug })
      ).unwrap();
      if (url) {
        toast.success("Url Has been Short");
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setOriginalLink("");
      setCustomSlug("");
      setLoading(false);
    }
  };
  return {
    originalLink,
    setOriginalLink,
    cutomSlug,
    setCustomSlug,
    shortNow,
    autoSlug,
    loading,
  };
}
