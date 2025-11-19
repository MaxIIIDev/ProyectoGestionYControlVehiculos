import React, { useState, useEffect } from "react";
import Select, { type StylesConfig } from "react-select";

interface Option {
  label: string;
  value: string;
  original: { [key: string]: string };
}

interface ComboBoxBrowserProps {
  apiUrl: string;
  apiMethod?: string;
  onSelect?: (option: string) => void;
  onEntitySelect?: (entity: { [key: string]: string }) => void;
  defaultOption?: string;
  name?: string;
  placeholder?: string;
}
const darkSelectStyles: StylesConfig<Option, false> = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "#212529",
    color: "white",
    borderColor: state.isFocused ? "#0d6efd" : "#495057",
    boxShadow: state.isFocused
      ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
      : "none",
    "&:hover": {
      borderColor: "#0d6efd",
    },
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: "#212529",
    border: "1px solid #495057",
    zIndex: 9999,
  }),

  option: (styles, state) => {
    let bgColor = "#212529";
    if (state.isSelected) {
      bgColor = "#0d6efd";
    } else if (state.isFocused) {
      bgColor = "#343a40";
    }

    return {
      ...styles,
      backgroundColor: bgColor,
      color: "white",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#0d6efd",
      },
    };
  },

  singleValue: (styles) => ({
    ...styles,
    color: "white",
  }),

  input: (styles) => ({
    ...styles,
    color: "white",
  }),

  placeholder: (styles) => ({
    ...styles,
    color: "#adb5bd",
  }),
};
const ComboBoxBrowser: React.FC<ComboBoxBrowserProps> = ({
  apiUrl,
  apiMethod,
  onSelect,
  onEntitySelect,
  defaultOption,
  name,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option | null>(null);

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
      return;
    }
    const timeout = setTimeout(() => {
      fetch(`${apiUrl}${inputValue}`, {
        method: apiMethod,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Respuesta de la API:", data);
          // Trae un array directamente
          const opts = (Array.isArray(data) ? data : []).map(
            (v: { [key: string]: string }) => ({
              value: v.idVehiculo,
              label: v.patente,
              original: v,
            })
          );
          setOptions(opts);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue, apiUrl, apiMethod]);

  return (
    <Select
      name={name}
      placeholder={placeholder || defaultOption}
      options={options}
      value={selected}
      onInputChange={setInputValue}
      onChange={(opt) => {
        setSelected(opt as Option);
        if (onSelect) onSelect((opt as Option)?.value || "");
        if (onEntitySelect) onEntitySelect((opt as Option)?.original || null);
      }}
      styles={darkSelectStyles}
      isClearable
      isSearchable
      noOptionsMessage={() => "Sin resultados"}
    />
  );
};

export default ComboBoxBrowser;
