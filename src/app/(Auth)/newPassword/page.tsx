"use client";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import { IMAGES } from "@/constant/images";
import useNewPassword from "@/hooks/useNewPassword";
import { useAppDispatch } from "@/hooks/useRedux";
import { tokenVerify } from "@/store/slice/userSlice";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function NewPasswordContent() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleForGet,
    setToken,
  } = useNewPassword();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (token) {
      setToken(token);
      dispatch(tokenVerify({ token }))
        .unwrap()
        .catch(() => {
          setShow(false);
        });
    }
  }, [token, dispatch, setToken]);

  if (!show) {
    return (
      <div className="text-red-500 text-center">
        Sorry, credentials are not valid.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-backgroundColor p-2"
    >
      <div className="flex items-center justify-center absolute top-0">
        <h2 className="text-center bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
          Linkly
        </h2>
      </div>
      <div className="w-[100%] mt-5">
        <Heading heading="Enter Valid Password" para="" />
        <div className="w-[100%] flex flex-col items-center justify-center gap-5 mt-6">
          <InputField
            typeData="password"
            placeholderData="Password"
            inputValue={password}
            setInputValue={setPassword}
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

export default function NewPassword() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  );
}
