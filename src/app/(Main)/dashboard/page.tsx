import AutoPaste from "@/components/AutoPasteUrl";
import ProfileData from "@/components/ProfileData";
import TableData from "@/components/TableData";
import UrlShortner from "@/components/urlShortner";
import { IMAGES } from "@/constant/images";
import Image from "next/image";
import Link from "next/link";
import { CiFilter } from "react-icons/ci";

export default function Dashboard() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className="flex flex-col items-center w-[100%] min-h-screen bg-cover bg-center bg-backgroundColor "
    >
      <div className="flex flex-col  py-6   items-center  justify-between w-[95%]">
        <div className="flex items-center  justify-between w-[100%]">
          <div>
            <h2 className=" text-center bg-gradient-to-r from-blushRose to-btnPrimary text-transparent bg-clip-text font-extrabold text-[36.91px] leading-[45.44px]">
              <Link href="/dashboard"> Linkly</Link>
            </h2>
          </div>
          <div className="w-[65%] hidden lg:block mx-5">
            <UrlShortner />
          </div>

          <div>
            <ProfileData />
          </div>
        </div>
        <div className="w-[80%] lg:hidden my-5">
          <UrlShortner />
        </div>
        <div>
          <AutoPaste />
        </div>
      </div>
      <div className="flex w-full h-[70px] bg-inputBg justify-center">
        <div className="h-full flex gap-10 w-[50%] justify-center items-center">
          <div className="flex gap-2 items-center border-b-2 border-blue-500 pb-2">
            <Image src={IMAGES.clockimg} alt="History" width={20} height={20} />
            <h2 className="text-white text-[16px] font-semibold">History</h2>
          </div>
          <div className="flex gap-2 items-center hover:border-b-2 hover:border-blue-500 pb-2 transition-all duration-200">
            <Image
              src={IMAGES.chartimg}
              alt="Statistics"
              width={20}
              height={20}
            />
            <h2 className="text-white text-[16px] font-semibold">Statistics</h2>
          </div>
          <div className="flex gap-2 items-center hover:border-b-2 hover:border-blue-500 pb-2 transition-all duration-200">
            <Image
              src={IMAGES.settingImg}
              alt="Settings"
              width={20}
              height={20}
            />
            <h2 className="text-white text-[16px] font-semibold">Settings</h2>
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] flex flex-col   w-[100%] bg-tableBackGround justify-center items-center">
        <div className="mt-5 flex w-[90%] justify-between items-center">
          <h1 className=" text-white text-[16px] font-semibold">History</h1>
          <div className="group relative  px-4  md:py-3 py-2 bg-gray-800 border border-gray-500 rounded-full flex items-center gap-2 text-[14px] md:text-[15px] text-gray-300 hover:text-white transition-all duration-200">
            <CiFilter size={20} color="white" className="md:size-[25px]" />
            <Link href="/login">Filter</Link>
            <span className="absolute inset-0 bg-blue-500 opacity-0 group-active:opacity-20 group-active:scale-110 rounded-full transition-all duration-150 ease-out pointer-events-none" />
          </div>
        </div>
        <TableData bgcolor={"bg-midnightslate"} rowColor={"bg-midnight"} />
      </div>
    </div>
  );
}
