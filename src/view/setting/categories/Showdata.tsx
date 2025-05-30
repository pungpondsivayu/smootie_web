import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../../../components/ui/table";
  
  import Badge from "../../../components/ui/badge/Badge";
  import { IPagin } from "../../../@types/global";
  import {
    LoadingTable,
    NoInfoFound,
  } from "../../../components/global/AnimateTable";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
  import Tooltip from "../../../components/global/Tooltip";
  import { useNavigate } from "react-router";
import { IAllCategory } from "../../../@types/category/CategoryType";
  
  interface IProps {
    data: IAllCategory[];
    loading: boolean;
    pagin: IPagin;
    onDelete: (id: number, string: string) => void;
  }
  
  export default function Showdata({ data, pagin, loading , onDelete}: IProps) {
    //use hook
    const navigate = useNavigate();
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No.
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <LoadingTable colSpan={6} type="table" />
              ) : data && data.length === 0 ? (
                <NoInfoFound colSpan={6} />
              ) : (
                data &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={item.isUsed ? "success" : "error"}
                      >
                        {item.isUsed ? "Active" : "Non-active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex gap-2">
                      <Tooltip content={"แก้ไขข้อมูล"} color="warning">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-xl text-warning-400 cursor-pointer"
                          onClick={() => {
                            navigate("/setting/category/form", {
                              state: {
                                category: item,
                              }, // ส่งข้อมูลไปหน้าแก้ไข
                            });
                          }}
                        />
                      </Tooltip>
                      <Tooltip content={"ลบข้อมูล"} color="danger">
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-xl text-red-400 cursor-pointer"
                          onClick={() => onDelete(item.categoryId, item.name)}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  