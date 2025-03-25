"use client";
import Image from "next/image";
import { IMAGES } from "../constant/images";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileData() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center w-[180px] md:w-[250px] h-[55px] gap-3">
      <div className="relative w-full h-full">
        <div
          className={`flex items-center justify-between gap-3 py-1 border border-gray-500 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 font-semibold shadow-lg ${
            isOpen ? "rounded-t-[20px]" : "rounded-[30px]"
          } px-4 transition-all duration-300`}
        >
          <div className="text-left">
            <p className="text-gray-400 text-[10px] font-light">welcome</p>
            <h3 className="text-white text-[14px] truncate max-w-[150px]">
              {sessionData?.user?.name || "Stranger"}
            </h3>
          </div>

          <div>
            <Image
              onClick={() => setIsOpen(!isOpen)}
              src={IMAGES.dropdown}
              alt="Toggle dropdown"
              className="cursor-pointer hover:scale-110 transition-transform duration-200 w-5 h-5"
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-20 top-[55px] w-full text-gray-300 text-[14px] animate-fadeIn">
            <ul className="flex flex-col bg-gray-900 rounded-b-[20px] shadow-lg">
              <li className="p-4 hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <Link href="/dashboard/editProfile">Edit Profile</Link>
              </li>
              <li className="p-4 hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <Link href="/dashboard/customSlug">Custom Slug</Link>
              </li>
              <li className="p-4 hover:bg-gray-700 cursor-pointer transition-colors duration-150">
                <Link href="/dashboard/changePassword">Change Password</Link>
              </li>
              <li
                onClick={async () => await signOut()}
                className="p-4 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-150"
              >
                Log Out
              </li>
            </ul>
          </div>
        )}
      </div>

      <button className=" hidden md:block  items-center justify-center bg-blue-600 py-4 px-5 rounded-[30px] hover:bg-blue-700 transition-colors duration-200">
        <Image
          src={IMAGES.notification}
          alt="Notifications"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}
