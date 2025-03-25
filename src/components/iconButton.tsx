import { FaArrowRight } from "react-icons/fa";

export default function IconButton({
  onPress,
}: {
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onPress}
      className="rounded-full p-3 bg-btnPrimary border-none text-white 
                 transition-all duration-200 hover:brightness-110 active:scale-95 
                 shadow-md shadow-btnPrimary flex items-center justify-center"
    >
      <FaArrowRight size={20} />
    </button>
  );
}
