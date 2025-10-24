import React, { useState } from "react";
import "./css/TabFilterRadios.css";

interface Option {
  label: string;
  icon?: string;
  value: string;
}

interface TabFilterRadiosProps {
  options: Option[];
  onChange?: (value: string | null) => void;
  defaultValue?: string;
}

export default function TabFilterRadios({
  options,
  onChange,
  defaultValue,
}: TabFilterRadiosProps) {
  const [selected, setSelected] = useState<string | null>(defaultValue || null);

  const handleRadio = (value: string) => {
    const newValue = selected === value ? null : value;
    setSelected(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="filter-switch">
      {options.map((option, idx) => (
        <React.Fragment key={option.value}>
          <input
            type="radio"
            id={`option${idx + 1}`}
            name="filter"
            checked={selected === option.value}
            onChange={() => handleRadio(option.value)}
          />
          <label htmlFor={`option${idx + 1}`}>
            <i className={`bi ${option.icon}`}></i> {option.label}
          </label>
        </React.Fragment>
      ))}
      <span
        className="background"
        style={{
          left: selected
            ? `${
                (options.findIndex((o) => o.value === selected) /
                  options.length) *
                100
              }%`
            : "4px",
          width: options.length > 1 ? `${100 / options.length - 2}%` : "98%",
        }}
      />
    </div>
  );
}
