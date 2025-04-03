import AutoPaste from "@/components/AutoPasteUrl";
import HistoryCount from "@/components/HistoryCount";
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
      <div className="bg-[#181E29] mx-0 w-full flex justify-center items-center text-white gap-14  ">
        <div className="flex justify-center items-center text-white gap-14  ">
          <div className="relative flex justify-center items-center gap-2 border-b-4 border-[#144EE3] p-5">
            <div className="absolute inset-x-0 top-0 h-0 shadow-[0_8px_16px_2px_#144EE3]"></div>
            <div className="flex justify-center items-center gap-2 cursor-pointer">
              <div>
                <Image
                  width={20}
                  height={20}
                  src={IMAGES.clockimg}
                  alt="alarm"
                />
              </div>
              <div className="hidden md:block">History</div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 p-5 cursor-pointer">
            <div>
              <Image
                width={20}
                height={20}
                src={IMAGES.chartimg}
                alt="alaram"
              />
            </div>
            <div className="hidden md:block">Statistics</div>
          </div>
          <div className="flex justify-center items-center gap-2 p-5 cursor-pointer">
            <div>
              <Image
                width={20}
                height={20}
                src={IMAGES.settingImg}
                alt="alaram"
              />
            </div>
            <div className="hidden md:block">Settings</div>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex flex-col justify-center items-center bg-tableBackGround mx-auto">
        <div className="min-h-[80vh]  w-[92%] ">
          <div className="mt-5 flex justify-between items-center">
            <div>
              <h1 className=" text-white text-[16px] font-semibold">
                History (<HistoryCount />)
              </h1>
            </div>
            <div className="group relative  px-6  md:py-3 py-2 bg-inputBg border border-inputBordr rounded-full flex items-center gap-2 text-[14px] md:text-[15px] text-gray-300 hover:text-white transition-all duration-200">
              <CiFilter size={20} color="white" className="md:size-[25px]" />
              Filter
              <span className="absolute inset-0 bg-blue-500 opacity-0 group-active:opacity-20 group-active:scale-110 rounded-full transition-all duration-150 ease-out pointer-events-none" />
            </div>
          </div>
          <TableData bgcolor={"bg-midnightslate"} rowColor={"bg-midnight"} />
        </div>
      </div>
    </div>
  );
}
