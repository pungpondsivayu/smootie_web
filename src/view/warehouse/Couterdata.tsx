import { useNavigate } from "react-router";
import { IAllCouterStock, IAllStock } from "../../@types/warehouse/Warehouse";
import { IPagin } from "../../@types/global";
import { LoadingTable, NoInfoFound } from "../../components/global/AnimateTable";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

interface IProps {
  data: IAllCouterStock[];
  loading: boolean;
  pagin: IPagin;
}

export default function Couterdata({ data, pagin, loading }: IProps) {
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
                Quantity
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Unit
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
              ></TableCell>
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
              data.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}
                    </TableCell>
                    <TableCell className=" px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.unit}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          item.quantity <= 0
                            ? "error"
                            : item.quantity <= 5
                            ? "warning"
                            : "primary"
                        }
                      >
                        {item.quantity <= 0
                          ? "Out of Stock"
                          : item.quantity <= 5
                          ? "Low Stock"
                          : "Available"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
