type InputProps = {
    label: string;
    name: string;
    value: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    error?: string;
    pattern?: RegExp;
    showError: boolean; 
  };
  
  export const InputProfile: React.FC<InputProps> = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    required = true,
    error,
    pattern,
    showError = false,
  }) => {
    const hasRequiredError = required && !value;
  const hasPatternError = pattern && value && !pattern.test(value);
  const isInvalid = showError && (error || hasRequiredError || hasPatternError);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className={`w-full border rounded-lg px-4 py-2 ${
          isInvalid ? "border-red-500" : "border-gray-300"
        }`}
      />
      {isInvalid && (
        <p className="text-sm text-red-500 mt-1">
          {error || (hasRequiredError && "Trường này là bắt buộc.") || "Định dạng không hợp lệ."}
        </p>
      )}
    </div>
  );
  };