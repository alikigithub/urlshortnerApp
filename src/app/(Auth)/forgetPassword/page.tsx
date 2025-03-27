"use client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import { IMAGES } from "@/constant/images";
import useForgetPassword from "@/hooks/useForgetPassword";
import Link from "next/link";

export default function ForgetPassword() {
  const { email, setEmail, handleForGet, loading } = useForgetPassword();
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className=" reletive flex flex-col items-center justify-center  min-h-screen bg-cover bg-center bg-backgroundColor p-2"
    >
      <div className="flex items-center justify-center absolute top-0">
        <h2 className=" text-center bg-gradient-to-r from-blushRose to-btnPrimary text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          <Link href={"/"}>Linkly</Link>
        </h2>
      </div>
      <div className="mt-5">
        <Heading
          heading="Enter Your Email To get Your Password Recovered"
          para=""
        />
        <div className="flex flex-col items-center justify-center  gap-5 mt-6 ">
          <InputField
            typeData="email"
            placeholderData="Email"
            inputValue={email}
            setInputValue={setEmail}
          />

          <Button
            heading="Get Password"
            onPress={handleForGet}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
