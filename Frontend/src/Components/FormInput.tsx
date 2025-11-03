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
    <div className="form-control">
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
