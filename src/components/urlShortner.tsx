"use client";
import useHome from "@/hooks/useHome";
import LongInputField from "./LongInput";

export default function UrlShortner() {
  const { handleForGet, originalLink, setOriginalLink, loading } = useHome();

  return (
    <LongInputField
      placeholderData="Enter Url For Shortner"
      headingData="Shorten Now"
      enterValue={originalLink}
      setEnterValue={setOriginalLink}
      onPress={handleForGet}
      loading={loading}
    />
  );
}
