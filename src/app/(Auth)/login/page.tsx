"use client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import { IMAGES } from "@/constant/images";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";

export default function SignUp() {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className="  flex flex-col justify-between min-h-screen bg-cover bg-center bg-backgroundColor p-2"
    >
      <div className="flex items-center justify-center">
        <h2 className=" text-center bg-gradient-to-r from-blushRose to-btnPrimary text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
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
      <div className="flex flex-col items-center justify-center  gap-2 ">
        <InputField
          typeData="email"
          placeholderData="Email"
          inputValue={email}
          setInputValue={setEmail}
        />
        <InputField
          typeData="password"
          placeholderData="Password"
          inputValue={password}
          setInputValue={setPassword}
        />

        <Button heading="Sign In" onPress={handleLogin} />
        <p className="text-paragraphClr">
          <span className="text-btnPrimary">
            <Link href="/forgetPassword"> Forget Password </Link>
          </span>{" "}
          click here
        </p>
      </div>
      <div className="flex items-center justify-center ">
        <p className="text-paragraphClr">
          <span className="text-btnPrimary">
            <Link href="/signup"> click here</Link>
          </span>{" "}
          if already registered
        </p>
      </div>
    </div>
  );
}
