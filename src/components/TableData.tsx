"use client";
import { MdOutlineDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import useTableData from "@/hooks/useTableData";
import { IoIosLink } from "react-icons/io";
import { GoUnlink } from "react-icons/go";
import { MdSave } from "react-icons/md";
import Image from "next/image";

export default function TableData() {
  const {
    tableContent,
    copyShortUrl,
    dateFormating,
    editingRowId,
    editedValues,
    setEditedValues,
    editOnClick,
    handleSave,
    handleDelete,
  } = useTableData();

  return (
    <div className="flex w-full flex-grow justify-center  bg-opacity-50">
      <div className="w-full max-w-[1200px] overflow-x-auto px-2 md:px-4">
        <table className="table-auto w-full mt-4 border-collapse">
          <thead className="bg-theadClr">
            <tr className="text-white text-xs md:text-sm lg:text-base">
              <th className="p-2 text-left whitespace-nowrap">Short link</th>
              <th className="p-2 text-left whitespace-nowrap">Original link</th>
              <th className="p-2 text-left whitespace-nowrap">Qr link</th>
              <th className="p-2 text-left whitespace-nowrap">Clicks</th>
              <th className="p-2 text-left whitespace-nowrap">Status</th>
              <th className="p-2 text-left whitespace-nowrap">Date</th>
              <th className="p-2 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableContent?.map((data, index) => (
              <tr
                key={index}
                className="bg-rowBg border-b-2 border-inputBg text-xs md:text-sm"
              >
                <td className="text-paragraphClr p-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={data?.short}
                      target="_blank"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {data.short}
                    </a>
                    <button
                      className="bg-inputBg p-2 rounded-full cursor-pointer active:opacity-50 transition-opacity duration-150 flex-shrink-0"
                      onClick={() => copyShortUrl(data?.short)}
                    >
                      <FaCopy size={14} />
                    </button>
                  </div>
                </td>
                <td className="text-paragraphClr p-2">
                  {editingRowId === index ? (
                    <input
                      type="text"
                      value={editedValues?.original || ""}
                      onChange={(e) => {
                        setEditedValues({
                          ...editedValues,
                          original: e.target.value,
                        });
                      }}
                      className="w-full p-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
                      placeholder="Naya link daalo"
                    />
                  ) : (
                    <span className="block break-all">
                      {data?.original?.length > 40
                        ? data?.original?.slice(0, 40)?.concat("...")
                        : data?.original}
                    </span>
                  )}
                </td>
                <td className="p-2">
                  <Image
                    className="w-10 h-10 object-contain"
                    src={data?.qrCode}
                    width={200}
                    height={200}
                    alt={`QR code for ${data?.original}`}
                  />
                </td>
                <td className="text-paragraphClr p-2">{data?.clicks}</td>
                <td className="text-paragraphClr p-2">
                  {editingRowId === index ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isLocked"
                        checked={editedValues?.isLocked || false}
                        onChange={(e) =>
                          setEditedValues({
                            ...editedValues,
                            isLocked: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span>{data.isLocked ? "Unactive" : "Active"}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`${
                          data?.isLocked ? "text-goldenOchre" : "text-leafGreen"
                        }`}
                      >
                        {data?.isLocked ? "Unactive" : "Active"}
                      </span>
                      <div
                        className={`${
                          data?.isLocked ? "bg-vintageBrown" : "bg-deepPine"
                        } p-2 rounded-full flex-shrink-0`}
                      >
                        {data?.isLocked ? (
                          <GoUnlink size={14} />
                        ) : (
                          <IoIosLink size={14} />
                        )}
                      </div>
                    </div>
                  )}
                </td>
                <td className="text-paragraphClr p-2 whitespace-nowrap">
                  {dateFormating(data?.createdAt)}
                </td>
                <td className="text-paragraphClr p-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {editingRowId === index ? (
                      <button
                        onClick={() => handleSave()}
                        className="bg-blue-600 p-2 rounded-full active:opacity-50 transition-opacity duration-150 flex-shrink-0"
                      >
                        <MdSave size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => editOnClick(data, index)}
                        className="bg-inputBg p-2 rounded-full active:opacity-50 transition-opacity duration-150 flex-shrink-0"
                      >
                        <MdModeEdit size={16} />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(data?.id)}
                      className="bg-inputBg p-2 rounded-full active:opacity-50 transition-opacity duration-150 flex-shrink-0"
                    >
                      <MdOutlineDelete size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
