import { FaArrowRight } from "react-icons/fa";

export default function IconButton({
  onPress,
  loading,
}: {
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onPress}
      disabled={loading}
      className="px-4 py-4 md:px-6 md:py-6 rounded-full bg-btnPrimary border-none text-white transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md shadow-btnPrimary flex items-center justify-center disabled:opacity-50"
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h-8z"
          />
        </svg>
      ) : (
        <FaArrowRight size={20} />
      )}
    </button>
  );
}
