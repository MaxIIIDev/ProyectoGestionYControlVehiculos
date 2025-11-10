import { Form } from "react-bootstrap";
import "../css/FormInput.css";

interface FormInputProps {
  label: string;
  placeholder?: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  required: boolean;
  error?: string;
}

export default function FormInput({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  className,
  required,
  style,
  error,
}: FormInputProps) {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={`form-input ${className || ""}`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={style}
        isInvalid={!!error}
      />
      <Form.Control.Feedback
        type="invalid"
        className=" mx-2 px-1 fs-6 text-start"
      >
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
