"use client";
export default function Button({
  heading,
  onPress,
  loading,
}: {
  heading: string;
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onPress}
      disabled={loading}
      className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-btnPrimary border-none text-[14px] md:text-[15px] text-white font-bold transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md shadow-btnPrimary disabled:opacity-50"
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
        heading
      )}
    </button>
  );
}
