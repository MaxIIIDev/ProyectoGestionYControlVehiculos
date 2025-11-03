import "./css/FormInput.css";

interface FormInputProps {
  placeholder: string;
  type: string;
  name: string;
  id: string;
}

export default function FormInput({
  placeholder,
  type,
  name,
  id,
}: FormInputProps) {
  return (
    <div className="p-2 mb-2">
      <input
        type={type}
        className="form-input"
        name={name}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}
