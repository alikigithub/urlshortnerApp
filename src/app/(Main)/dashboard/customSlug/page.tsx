"use client";
import Button from "@/components/Button";
import LongInputField from "@/components/LongInput";
import ProfileData from "@/components/ProfileData";
import { IMAGES } from "@/constant/images";
import { useCustomSlug } from "@/hooks/useCustomSlug";
import Link from "next/link";

export default function CustomSlug() {
  const {
    originalLink,
    setOriginalLink,
    cutomSlug,
    setCustomSlug,
    shortNow,
    autoSlug,
    loading,
  } = useCustomSlug();
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className="flex-grow-1 flex flex-col items-center w-[100%] min-h-screen bg-cover bg-center bg-backgroundColor"
    >
      <div className="  flex flex-col h-[150px] py-6 items-center justify-between w-[95%]">
        <div className="flex items-center justify-between w-[100%]">
          <h2 className="text-center bg-gradient-to-r from-blushRose to-btnPrimary text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
            <Link href="/dashboard">Linkly</Link>
          </h2>
          <ProfileData />
        </div>
      </div>
      <div className=" mt-[-100px] flex-grow w-[90%] md:w-[50%] flex flex-col items-center gap-4 justify-center">
        <LongInputField
          placeholderData="Enter the Link to shorten here"
          headingData="none"
          enterValue={originalLink}
          setEnterValue={setOriginalLink}
          loading={loading}
        />

        <LongInputField
          placeholderData="Enter Custom Slug"
          headingData="Auto Generate"
          enterValue={cutomSlug}
          setEnterValue={setCustomSlug}
          onPress={autoSlug}
          loading={loading}
        />

        <Button heading="Shorten Now" onPress={shortNow} loading={loading} />
      </div>
    </div>
  );
}
