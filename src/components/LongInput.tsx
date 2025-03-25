import Image from "next/image";
import { IMAGES } from "../constant/images";
import Button from "./Button";
import IconButton from "./iconButton";

export default function LongInputField({
  placeholderData = "Enter text...",
  headingData = "Submit",
  enterValue = "",
  setEnterValue = () => {},
  onPress = () => {},
}: {
  placeholderData?: string;
  headingData?: string;
  enterValue?: string;
  setEnterValue?: (newValue: string) => void;
  onPress?: () => void;
}) {
  return (
    <div className="flex flex-row items-center border-4 border-inputBordr bg-inputBg rounded-full pl-2 p-1 w-[100%]">
      <Image src={IMAGES.linkImg} alt="Link Icon" className="" />
      <input
        type="text"
        value={enterValue}
        onChange={(e) => setEnterValue(e.target.value)}
        placeholder={placeholderData}
        className="px-2 focus:outline-none bg-transparent  text-white flex-grow h-[50px]"
      />
      {headingData !== "none" ? (
        <>
          <div className="block md:hidden">
            <IconButton onPress={onPress} />
          </div>

          <div className="hidden md:block">
            <Button onPress={onPress} heading={headingData} />
          </div>
        </>
      ) : null}
    </div>
  );
}
