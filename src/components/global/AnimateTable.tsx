import { TableCell, TableRow } from "../ui/table";

interface Props {
  colSpan?: number;
  type?: "table" | "div";
  className?: string;
}

export function LoadingTable({ colSpan, type, className }: Props) {
  if (colSpan && type === "table") {
    return (
      <TableRow>
        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400" colSpan={colSpan}>
          <div
            aria-label="Loading..."
            role="status"
            className="flex items-center justify-center space-x-2 my-16"
          >
            <svg
              className="h-20 w-20 animate-spin stroke-dark-green"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
            </svg>
            <span className="text-2xl font-medium text-gray-500">
              loading...
            </span>
          </div>
        </TableCell>
      </TableRow>
    );
  } else if (!colSpan && type === "div") {
    return (
      <div className="w-full relative">
        <div aria-label="Loading..." role="status" className={`flex items-center ${className}`}>
          <svg className="h-20 w-20 animate-spin stroke-dark-green" viewBox="0 0 256 256">
            <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
            <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          </svg>
          <span className="text-2xl font-medium text-gray-500">กำลังประมวลผล...</span>
        </div>
      </div>
    );
  }
}

export const NoInfoFound = ({ colSpan }: Props) => {
  return (
    <TableRow>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400" colSpan={colSpan}>
        <div className="flex justify-center leading-10 text-center text-red-500 align-middle">
          <b className="py-3">-- ไม่พบข้อมูล --</b>
        </div>
      </TableCell>
    </TableRow>
  );
};