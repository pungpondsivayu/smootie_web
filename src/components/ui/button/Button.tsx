import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "outline"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning";
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  type?: "button" | "reset" | "submit"; // Disabled state
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 disabled:bg-brand-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    success: "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
    warning: "bg-yellow-400 text-black hover:bg-yellow-500 disabled:bg-yellow-300",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100",
    "outline-primary": "bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-50",
    "outline-secondary": "bg-transparent text-gray-700 border border-gray-400 hover:bg-gray-100",
    "outline-success": "bg-transparent text-green-500 border border-green-500 hover:bg-green-50",
    "outline-danger": "bg-transparent text-red-500 border border-red-500 hover:bg-red-50",
    "outline-warning": "bg-transparent text-yellow-500 border border-yellow-500 hover:bg-yellow-50",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
