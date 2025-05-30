import React, { useState, useRef, useEffect } from "react";
import { CloseIcon } from "../../icons";

interface Option {
  value: any;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (option: Option | null) => void;
  className?: string;
  defaultValue?: any;
}

const SearachSelect: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Option | null>(
    options.find((opt) => opt.value === defaultValue) || null
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    setSearchTerm("");
    onChange(option);
  };

  const handleClear = () => {
    const defaultOption = { value: "", label: "" };
    setSelected(null);
    setSearchTerm("");
    onChange(defaultOption);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <div
        className="h-11 w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm shadow-theme-xs cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className={selected ? "text-black dark:text-white" : "text-gray-400"}
        >
          {selected ? selected.label : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {selected && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // ป้องกันไม่ให้ dropdown เปิดตอนกดปุ่ม clear
                handleClear();
              }}
              className="text-gray-400"
              title="Clear selection"
            >
              <CloseIcon />
            </button>
          )}
          <svg
            className="w-4 h-4 text-gray-500 dark:text-white ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border-b border-gray-200 dark:border-gray-600 focus:outline-none dark:bg-gray-800 dark:text-white"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              const val = e.target.value;
              setSearchTerm(val);
              if (selected) {
                setSelected(null); // reset ค่าเมื่อพิมพ์ใหม่
                onChange(null);
              }
            }}
            autoFocus
          />
          <ul>
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-black dark:text-white"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearachSelect;
