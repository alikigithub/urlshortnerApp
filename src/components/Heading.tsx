export default function Heading({
  heading,
  para,
}: {
  heading: string;
  para: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1
        className="text-[32px] md:text-[48px] font-extrabold bg-gradient-to-r from-[#EB568E] to-[#144EE3] text-transparent bg-clip-text 
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
