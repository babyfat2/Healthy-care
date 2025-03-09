import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputTextProps {
  label?: string;
  placeholder?: string;
  width?: string;
  required?: boolean;
  errorText?: string | undefined;
  type?: "text" | "password";
  value?: string; // add value inside
  onChange?: (value: string) => void; // Callback to get value
}

function InputText({
  label = "User Name",
  placeholder = "Enter your name...",
  width = "w-64",
  required = false,
  errorText,
  type = "text",
  value = "", // defaul: ""
  onChange, //  callback to get value
}: InputTextProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue); // Send value to parent component if available
  };

  const handleBlur = () => {
    if (required && !internalValue) {
      setError("Trường này là bắt buộc");
    } else {
      setError("");
    }
  };

  return (
    <div className={`flex flex-col ${width} space-y-1`}>
      <label className="text-gray-700 font-medium flex justify-between">{label}</label>
      <div className="relative">
        <input
          value={internalValue}
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {errorText && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
}

export default InputText;
