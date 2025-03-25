"use client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import { IMAGES } from "@/constant/images";
import useSignUp from "@/hooks/useSignUp";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function SignUp() {
  const {
    email,
    setEmail,
    userName,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    inputhandler,
  } = useSignUp();
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className="  flex flex-col justify-between min-h-screen bg-cover bg-center bg-backgroundColor p-2"
    >
      <div className="flex items-center justify-center">
        <h2 className=" text-center bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          Linkly
        </h2>
      </div>
      <div className="mt-5">
        <Heading
          heading="Shorten Your Loooong Links"
          para=" Linkly is an efficient and easy-to-use URL shortening service that
        streamlines your online experience."
        />
      </div>
      <div className="flex flex-col items-center justify-center  gap-2 mt-6 ">
        <InputField
          typeData="email"
          placeholderData="Email"
          inputValue={email}
          setInputValue={setEmail}
        />
        <InputField
          typeData="text"
          placeholderData="Name"
          inputValue={userName}
          setInputValue={setUsername}
        />
        <InputField
          typeData="password"
          placeholderData="Password"
          inputValue={password}
          setInputValue={setPassword}
        />
        <InputField
          typeData="password"
          placeholderData=" Confirm Password"
          inputValue={confirmPassword}
          setInputValue={setConfirmPassword}
        />

        <Button heading="Register" onPress={inputhandler} />
        <ToastContainer />
      </div>
      <div className="flex items-center justify-center ">
        <p className="text-paragraphClr">
          <span className="text-btnPrimary">
            <Link href="/login">Sign in</Link>{" "}
          </span>{" "}
          if already registered
        </p>
      </div>
    </div>
  );
}
