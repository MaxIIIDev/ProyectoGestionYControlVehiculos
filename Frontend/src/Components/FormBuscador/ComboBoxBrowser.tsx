import React, { useState, useEffect } from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}

interface ComboBoxBrowserProps {
  apiUrl: string;
  apiMethod?: string;
  onSelect?: (option: string) => void;
  onEntitySelect?: (entity: any) => void;
  defaultOption?: string;
  name?: string;
  placeholder?: string;
}

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
          const opts = (Array.isArray(data) ? data : []).map((v: any) => ({
            value: v.patente,
            label: v.patente,
            original: v,
          }));
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
        if (onEntitySelect) onEntitySelect((opt as any)?.original || null);
      }}
      isClearable
      isSearchable
      noOptionsMessage={() => "Sin resultados"}
    />
  );
};

export default ComboBoxBrowser;
