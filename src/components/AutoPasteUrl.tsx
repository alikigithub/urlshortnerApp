"use client";
import useHome from "@/hooks/useHome";
import React, { useState } from "react";
import { toast } from "react-toastify";
const AutoPaste = () => {
  const [autoPaste, setAutoPaste] = useState(false);
  const { originalLink } = useHome();

  const handleCheckboxChange = () => {
    setAutoPaste((prev) => {
      const newValue = !prev;
      if (newValue && originalLink) {
        navigator.clipboard
          .writeText(originalLink)
          .then(() => {
            toast.success("Url copy");
          })
          .catch((err) => {
            toast.error(err as string);
          });
      }
      return newValue;
    });
  };
  return (
    <div className="mt-4 flex justify-center">
      <label
        htmlFor="auto-paste"
        className="flex items-center gap-2 text-sm text-gray-400"
      >
        <div className="relative inline-block w-12 h-6 rounded-full bg-gray-800 border border-gray-700">
          <input
            id="auto-paste"
            type="checkbox"
            className="sr-only peer"
            checked={autoPaste}
            onChange={handleCheckboxChange}
          />
          <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-gray-600 peer-checked:bg-btnPrimary peer-checked:left-7 transition-all duration-200"></span>
        </div>
        Auto Paste to Clipboard
      </label>
    </div>
  );
};

export default AutoPaste;
