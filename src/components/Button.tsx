export default function Button({
  heading,
  onPress,
}: {
  heading: string;
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onPress}
      className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-[#144EE3] border-none text-[14px] md:text-[15px] text-white font-bold transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md shadow-[#144EE3]"
    >
      {heading}
    </button>
  );
}
