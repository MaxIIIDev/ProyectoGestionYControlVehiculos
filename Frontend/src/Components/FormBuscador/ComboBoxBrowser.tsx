import Form from "react-bootstrap/Form";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface ComboBoxBrowserProps {
  options: Option[];
  onSelect: (option: string) => void;
  defaultOption?: string;
  value?: string;
  name?: string;
}

const ComboBoxBrowser: React.FC<ComboBoxBrowserProps> = ({
  options,
  onSelect,
  defaultOption,
  value,
  name,
}) => {
  return (
    <Form.Select
      name={name}
      value={value ?? ""}
      onChange={(e) => onSelect(e.target.value)}
    >
      {defaultOption && (
        <option value="" disabled>
          {defaultOption}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default ComboBoxBrowser;
