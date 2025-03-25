import AutoPaste from "@/components/AutoPasteUrl";
import Heading from "@/components/Heading";
import SearchCount from "@/components/SearchCount";
import TableData from "@/components/TableData";
import UrlShortner from "@/components/urlShortner";
import { IMAGES } from "@/constant/images";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${IMAGES.backgroundOne.src}),url(${IMAGES.backgroundTwo.src})`,
      }}
      className="flex flex-col items-center w-full min-h-screen bg-cover bg-center bg-backgroundColor text-white"
    >
      <div className="flex items-center justify-between w-[90%] md:w-[95%] py-6">
        <h2 className="text-[24px] md:text-[36.91px] font-extrabold bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text">
          Linkly
        </h2>
        <div className="flex items-center gap-3">
          <div className="px-4 md:py-3 py-2  bg-gray-800 border border-gray-500 rounded-full flex items-center gap-2 text-[14px] md:text-[15px] text-gray-300 hover:text-white transition-all">
            <Link href="/login">Login</Link>
            <CiLogin size={20} color="white" className="md:size-25" />
          </div>
          <div className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-[#144EE3] border-none text-[14px] md:text-[15px] text-white font-bold transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md shadow-[#144EE3]">
            <Link href="/signup">Register Now</Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col  items-center w-[90%] md:w-[95%] mt-8 md:mt-12 text-center">
        <Heading
          heading="Shorten Your Loooong Links :)"
          para="Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience."
        />{" "}
        <div className="w-[80%] md:w-[50%]">
          <UrlShortner />
        </div>
        <AutoPaste />
        <p className="mt-6 text-sm text-gray-400">
          You can create <SearchCount /> more links.
          <Link href="/signup" className="text-blue-500 hover:underline">
            Register Now
          </Link>
          to enjoy Unlimited usage
        </p>
      </div>
      <TableData />
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center py-3 z-1 shadow-lg">
        <p className="m-0 text-sm sm:text-base">
          Register to enjoy unlimited history?
          <Link
            href="/signup"
            className="text-blue-500 font-bold hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
