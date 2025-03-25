import AutoPaste from "@/components/AutoPasteUrl";
import ProfileData from "@/components/ProfileData";
import TableData from "@/components/TableData";
import UrlShortner from "@/components/urlShortner";
import { IMAGES } from "@/constant/images";
import Image from "next/image";
import Link from "next/link";

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
      <div className=" flex w-[100%] h-[70px] bg-inputBg justify-center">
        <div className=" h-[100%] flex gap-12 w-[50%]  justify-center items-center">
          <div className="flex gap-2">
            <Image src={IMAGES.settingImg} alt="Loading..." />
            <h2 className="text-white">History</h2>
          </div>
          <div className="flex gap-2">
            <Image src={IMAGES.settingImg} alt="Loading..." />
            <h2 className="text-white">Statistics</h2>
          </div>
          <div className="flex gap-2">
            <Image src={IMAGES.settingImg} alt="Loading..." />
            <h2 className="text-white">Settings</h2>
          </div>
        </div>
      </div>
      <TableData />
    </div>
  );
}
