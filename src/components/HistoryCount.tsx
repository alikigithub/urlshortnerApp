"use client";

import { useAppSelector } from "@/hooks/useRedux";
export default function HistoryCount() {
  const history = useAppSelector((state) => state.url.history);
  return history;
}
