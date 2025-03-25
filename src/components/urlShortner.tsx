"use client";
import useHome from "@/hooks/useHome";
import LongInputField from "./LongInput";

export default function UrlShortner() {
  const { handleForGet, originalLink, setOriginalLink } = useHome();

  return (
    <LongInputField
      placeholderData="Enter Url For Shortner"
      headingData="Shorter Now"
      enterValue={originalLink}
      setEnterValue={setOriginalLink}
      onPress={handleForGet}
    />
  );
}
