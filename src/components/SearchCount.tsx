"use client";

import { useAppSelector } from "@/hooks/useRedux";
export default function SearchCount() {
  const searchRemains = useAppSelector((state) => state.url.searchRemain);
  return searchRemains;
}
