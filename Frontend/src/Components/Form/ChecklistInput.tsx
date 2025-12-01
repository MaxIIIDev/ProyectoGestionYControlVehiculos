import { Form } from "react-bootstrap";
import "../css/FormInput.css";

interface ChecklistInputProps {
  label?: string;
  name: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function ChecklistInput({
  label,
  name,
  value,
  onChange,
  className,
  required,
  style,
  error,
  disabled,
}: ChecklistInputProps) {
  return (
    <div className={`form-input d-flex row ${className || ""}`} style={style}>
      <span>{label}</span>
      <div className="w-25 justify-content-end">
        <Form.Check
          type="switch"
          id={name}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          disabled={disabled}
          label=""
        />
      </div>
      {error && (
        <div className="mx-2 px-1 fs-6 text-start text-danger">{error}</div>
      )}
    </div>
  );
}
