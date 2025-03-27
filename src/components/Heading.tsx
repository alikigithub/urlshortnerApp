export default function Heading({
  heading,
  para,
}: {
  heading: string;
  para: string;
}) {
  return (
    <div className=" mb-2 md:mb-5 flex flex-col items-center text-center gap-2 md:gap-5">
      <h1
        className="text-[32px] md:text-[48px] font-extrabold bg-gradient-to-r from-blushRose to-btnPrimary text-transparent bg-clip-text 
                   leading-[1.1] tracking-tight"
        style={{ textRendering: "geometricPrecision" }}
      >
        {heading}
      </h1>
      <p className="mt-2 text-[14px] md:text-[16px] text-gray-400 max-w-[600px]">
        {para}
      </p>
    </div>
  );
}
