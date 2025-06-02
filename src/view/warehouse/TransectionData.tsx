import { useNavigate } from "react-router";
import {
  IAllStock,
  IAllTransetion,
  IStockRequestItem,
} from "../../@types/warehouse/Warehouse";
import { IPagin, IResponse } from "../../@types/global";
import {
  LoadingTable,
  NoInfoFound,
} from "../../components/global/AnimateTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { formatDateLocalized } from "../../utils/date/formatDate";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon } from "../../icons";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useChangeStatusMutation } from "../../controller/Warehouse.Controllers";
import toast from "react-hot-toast";
import { useAppSelector } from "../../redux/store/hook";
import { convertToSimpleFormData } from "../../utils/SendForm";
import { Roles } from "../../common/SD";

interface IProps {
  data: IAllTransetion[];
  loading: boolean;
  pagin: IPagin;
  HandleSubmit: (
    userId: number,
    stockRequestId: number,
    status: string
  ) => void;
}

export default function TransectionData({ data, pagin, loading ,HandleSubmit}: IProps) {
  //use hook
  const navigate = useNavigate();

  const { user }: any = useAppSelector((state) => state.auth);
  const [isActiveTable, setIsActiveTable] = useState<boolean>(false);
  const { isOpen, closeModal, openModal } = useModal();
  const [Data, setData] = useState<IStockRequestItem[]>([]);


  useEffect(() => {
    if (!isOpen) {
      setData([]);
    }
  }, [isOpen]);
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
                      {formatDateLocalized(item.requestDate, {
                        lang: "en",
                        yearType: "AD",
                      })}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.requestType}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.status}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex gap-3 items-center">
                      <div
                        onClick={() => {
                          openModal();
                          setData(item.stockRequestItem);
                        }}
                      >
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      </div>
                      {item.status == "pending" &&
                        item.requestType == "request" && user?.role == Roles.Manager && (
                          <>
                            <div className="flex gap-3">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-2xl text-success-400 cursor-pointer"
                                onClick={() => {
                                  HandleSubmit(
                                    user?.id,
                                    item.requestId,
                                    "approve"
                                  );
                                }}
                              />
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="text-2xl text-error-600 cursor-pointer"
                                onClick={() => {
                                  HandleSubmit(
                                    user?.id,
                                    item.requestId,
                                    "not approve"
                                  );
                                }}
                              />
                            </div>
                          </>
                        )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[780px] p-6 lg:p-10"
        >
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
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                ></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Data &&
                Data.map((item, index) => {
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
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Modal>
      </div>
    </div>
  );
}
