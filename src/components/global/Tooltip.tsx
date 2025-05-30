import { ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  color?: "default" | "primary" | "success" | "danger" | "warning" | "info";

}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  color = "default",

}) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const colorClasses = {
    default: "bg-gray-800 text-white",
    primary: "bg-blue-600 text-white",
    success: "bg-green-600 text-white",
    danger: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-sky-500 text-white",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-sm text-white shadow-lg ${positionClasses[position]} ${colorClasses[color]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
