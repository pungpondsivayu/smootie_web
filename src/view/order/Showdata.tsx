import { useNavigate } from "react-router";
import { IAllStock } from "../../@types/warehouse/Warehouse";
import { IPagin } from "../../@types/global";
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
import Badge from "../../components/ui/badge/Badge";
import { IAllOrder } from "../../@types/order/OrderType";
import { formatDateTimeLocalized } from "../../utils/date/formatDate";
import { EyeIcon } from "../../icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useRef, useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
interface IProps {
  data: IAllOrder[];
  loading: boolean;
  pagin: IPagin;
}

export default function Showdata({ data, pagin, loading }: IProps) {
  //use hook
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState<IAllOrder | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrintPDF = async (order: IAllOrder) => {
    setSelectedOrder(order);
    setTimeout(async () => {
      if (!printRef.current) return;

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt_order_${order.orderId}.pdf`);
    }, 100);
  };

 const Receipt = forwardRef<HTMLDivElement, { order: IAllOrder }>(
  ({ order }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[210mm] p-6 bg-white text-black text-[14px] font-sans"
      >
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Receipt</h1>
          <p>Your Company Co., Ltd.</p>
          <p>Tel: 012-345-6789</p>
        </div>

        <div className="mb-4">
          <p>
            <strong>Order No.:</strong> {order.orderId}
          </p>
          <p>
            <strong>Date:</strong> {formatDateTimeLocalized(order.orderTime , {
              lang : "en",
              yearType : "AD"
            })}
          </p>
          <p>
            <strong>Channel:</strong> {order.channel}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>

        <table className="w-full border-collapse border mb-6">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-2 py-1">Product</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Unit Price</th>
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">
                  {item.price.toLocaleString()}
                </td>
                <td className="border px-2 py-1">
                  {(item.quantity * item.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right space-y-1">
          <p>
            <strong>Subtotal:</strong> {order.totalAmount.toLocaleString()} THB
          </p>
          <p>
            <strong>Discount:</strong> {order.discountAmount.toLocaleString()} THB
          </p>
          <p>
            <strong>Grand Total:</strong> {order.finalAmount.toLocaleString()} THB
          </p>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          <p>Thank you for your business.</p>
        </div>
      </div>
    );
  }
);


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
                Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                channel
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                payment
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                total
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                status
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
                      {formatDateTimeLocalized(item.orderTime, {
                        lang: "en",
                        yearType: "AD",
                      })}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.channel}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.paymentMethod}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.finalAmount}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.status}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex gap-2">
                      <div
                        onClick={() => handlePrintPDF(item)}
                        className="cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className="fill-gray-500 dark:fill-gray-400 size-5"
                        />
                      </div>
                      <div
                        onClick={() => {
                          navigate("/order/detail", {
                            state: {
                              order: item,
                            },
                          });
                        }}
                      >
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      {selectedOrder && (
        <div ref={printRef} className="absolute left-[-9999px] top-0">
          <Receipt order={selectedOrder} />
        </div>
      )}
    </div>
  );
}
