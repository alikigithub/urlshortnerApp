"use client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import { IMAGES } from "@/constant/images";
import { useChangePassword } from "@/hooks/useChangePassword";
import Link from "next/link";

export default function ChangePassword() {
  const {
    handleForGet,
    setNewPassword,
    setConfirmPassword,
    setOldPassword,
    newpassword,
    confirmPassword,
    oldPassword,
  } = useChangePassword();
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className=" reletive flex flex-col items-center justify-center  min-h-screen bg-cover bg-center bg-backgroundColor p-2"
    >
      <div className="flex items-center justify-center absolute top-0">
        <h2 className=" text-center bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          <Link href="/dashboard"> Linkly</Link>
        </h2>
      </div>
      <div className=" w-[100%] mt-5">
        <Heading heading="Change Your Password" para="" />
        <div className=" w-[100%] flex flex-col items-center justify-center  gap-5 mt-6 ">
          <InputField
            typeData="password"
            placeholderData="Old Password"
            inputValue={oldPassword}
            setInputValue={setOldPassword}
          />
          <InputField
            typeData="password"
            placeholderData="Password"
            inputValue={newpassword}
            setInputValue={setNewPassword}
          />
          <InputField
            typeData="password"
            placeholderData="Confirm Password"
            inputValue={confirmPassword}
            setInputValue={setConfirmPassword}
          />

          <Button heading="Get Password" onPress={handleForGet} />
        </div>
      </div>
    </div>
  );
}
