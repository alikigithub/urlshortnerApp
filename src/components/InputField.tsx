export default function InputField({
  typeData = "text",
  placeholderData = "Enter text...",
  inputValue = "",
  setInputValue = () => {},
  readInput = false,
}: {
  typeData?: string;
  placeholderData?: string;
  inputValue?: string;
  setInputValue?: (newValue: string) => void;
  readInput?: boolean;
}) {
  return (
    <div className="w-[80%] md:w-[40%]">
      <input
        type={typeData}
        placeholder={placeholderData}
        value={inputValue || ""}
        required
        readOnly={readInput}
        onChange={(e) => setInputValue(e.target.value)}
        className=" rounded-full h-[60px] w-[100%] border-4 border-inputBordr bg-inputBg px-4 focus:outline-none text-white"
      />
    </div>
  );
}
