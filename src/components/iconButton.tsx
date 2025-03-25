import { FaArrowRight } from "react-icons/fa";

export default function IconButton({
  onPress,
}: {
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onPress}
      className="rounded-full p-3 bg-[#144EE3] border-none text-white 
                 transition-all duration-200 hover:brightness-110 active:scale-95 
                 shadow-md shadow-[#144EE3] flex items-center justify-center"
    >
      <FaArrowRight size={20} />
    </button>
  );
}
