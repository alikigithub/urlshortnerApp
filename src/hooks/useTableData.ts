"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { toast } from "react-toastify";
import { deleteTable, tableData, updateData } from "@/store/slice/urlSlice";
import { allUrls } from "@/types/type";
export default function useTableData() {
  const [tableContent, setTableContent] = useState<allUrls[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [editedValues, setEditedValues] = useState({
    id: "",
    isLocked: false,
    original: "",
  });
  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  const editOnClick = (data: allUrls, index: number) => {
    setEditingRowId(index);
    setEditedValues({
      id: data?.id,
      original: data?.original,
      isLocked: data?.isLocked,
    });
  };
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    try {
      await dispatch(
        updateData({
          id: editedValues.id,
          isLocked: editedValues.isLocked,
          original: editedValues.original,
        })
      )
        .unwrap()
        .then(() => toast.success("Data Has been updated"));
      setEditingRowId(null);
      setEditedValues({
        id: "",
        isLocked: false,
        original: "",
      });
    } catch (error) {
      setEditingRowId(null);
      toast.error(error as string);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const data = await dispatch(deleteTable({ id })).unwrap();
      if (data) {
        toast.success("data has been deleted");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  useEffect(() => {
    dispatch(tableData())
      .unwrap()
      .catch((error) => toast.error(error));
  }, [dispatch]);
  const allUrls = useAppSelector((state) => state.url.allUrls);
  useEffect(() => {
    setTableContent(allUrls);
  }, [allUrls]);
  const copyShortUrl = async (copyUrl: string) => {
    try {
      await navigator.clipboard.writeText(copyUrl);
      return toast.success("Url Copy");
    } catch {
      return toast.error("Data not Copy");
    }
  };
  const dateFormating = (dateData: string) => {
    const dataformat = new Date(dateData).toLocaleDateString("en-GB");
    return dataformat;
  };
  return {
    tableContent,
    copyShortUrl,
    dateFormating,
    editingRowId,
    setEditingRowId,
    editedValues,
    editOnClick,
    handleSave,
    setEditedValues,
    handleDelete,
    toggleRow,
    expandedRow,
  };
}
