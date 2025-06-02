import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { NoInfoFound } from "../../components/global/AnimateTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { IDropDown, IResponse } from "../../@types/global";
import { useLazyGetIngredientDropdownQuery } from "../../controller/Ingredient.Controllers";
import toast from "react-hot-toast";
import SearachSelect from "../../components/form/SearachSelect";
import { useAppSelector } from "../../redux/store/hook";
import { Roles } from "../../common/SD";
import { useCraeteTransectionMutation } from "../../controller/Warehouse.Controllers";
import { useNavigate } from "react-router";

type StockItem = {
  stockId: number;
  ingredientId: number;
  quantity: number;
  createdDate: string;
};

const ingredientList = [
  { id: 11, name: "น้ำตาล" },
  { id: 12, name: "แป้ง" },
  { id: 13, name: "ไข่" },
];

function TransectionForm() {
  const navigate = useNavigate();
  const { user , }: any = useAppSelector((state) => state.auth);
  const [requestType, setRequestType] = useState("add");
  const [ingredientId, setIngredientId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [ingredientDeowdown, setIngredientDeowdown] = useState<IDropDown[]>([]);
  const [requestDate , setRequestDate] = useState(new Date());
  const [GetIngredientDropdown] = useLazyGetIngredientDropdownQuery();
  const [CraeteTransection] = useCraeteTransectionMutation();

  const addItem = () => {
    if (!ingredientId || quantity <= 0) return;

     const exists = stockItems.find(
      (item) => item.ingredientId === parseInt(ingredientId)
    );
    if (exists) {
      alert("วัตถุดิบนี้ถูกเพิ่มแล้ว");
      return;
    }

    const newItem: StockItem = {
      stockId: 0,
      ingredientId: parseInt(ingredientId),
      quantity,
      createdDate: requestDate.toISOString(),
    };

    setStockItems([...stockItems, newItem]);
    setIngredientId("");
    setQuantity(1);
  };

  const removeItem = (id: number) => {
    setStockItems(stockItems.filter((item) => item.ingredientId !== id));
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (stockItems.length > 0) {
      const payload = {
        requestId: 0,
        employeeId: user?.id,
        branchId: user?.branchId,
        requestDate: requestDate.toISOString(),
        requestType,
        stockItem: stockItems,
      };
      const response: IResponse<any> = await CraeteTransection(payload);
      if (response && response.data) {
        const res = response.data;
        if (res?.statusCode == 200 && res?.success) {
          toast.success(res?.message);
          setTimeout(() => {
            navigate("/warehouse/transection");
          }, 1000);
        }
      } else {
        toast.error(response.error.data.message);
      }
    } else {
      toast.error("Unable to complete the transaction");
    }
    // TODO: POST to API
  };

  async function fetchIngredientDropdown() {
    const res = await GetIngredientDropdown(null);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setIngredientDeowdown(data);
    }
  }

  const getIngredientName = (id: number) => {
    return ingredientDeowdown.find((ing) => ing.value === id)?.label || "ไม่พบชื่อ";
  };

  const updateQuantity = (id: number, delta: number) => {
    setStockItems((prev) =>
      prev.map((item) =>
        item.ingredientId === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta), // ไม่ให้ต่ำกว่า 1
            }
          : item
      )
    );
  };

  useEffect(() => {
    fetchIngredientDropdown();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setRequestDate(new Date())
    }, 1000);
  })
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Form-transection" />
      <div>
        <ComponentCard title={`Create transection`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SECTION: คำร้อง */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request type
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="add">Add stock</option>
                  <option value="request">Pick up raw materials</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  date
                </label>
                <input
                  type="text"
                  value={requestDate.toLocaleString()}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-600 border border-gray-200"
                />
              </div>
            </div>

            {/* SECTION: ตารางวัตถุดิบ */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
              <Table>
                <TableHeader className="bg-blue-50 border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      raw material
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      quantity
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      delete
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {stockItems.length === 0 ? (
                    <NoInfoFound colSpan={6} />
                  ) : (
                    stockItems &&
                    stockItems.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {getIngredientName(item.ingredientId)}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.ingredientId, -1)
                                }
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                              >
                                -
                              </button>
                              <span className="min-w-[30px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.ingredientId, 1)
                                }
                                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                              >
                                +
                              </button>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => removeItem(item.ingredientId)}
                              className="text-red-500 hover:text-red-700 transition"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* SECTION: เพิ่มรายการ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  raw material
                </label>
                <SearachSelect
                  options={ingredientDeowdown}
                  placeholder="raw material"
                  onChange={(e: any) => {
                    setIngredientId(e.value);
                  }}
                  className="w-full dark:bg-dark-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  quantity
                </label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <Button
                  type="button"
                  onClick={addItem}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <FontAwesomeIcon icon={faPlus} /> Add transection
                </Button>
              </div>
            </div>

            {/* SECTION: Submit */}
            <div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </Button>
            </div>
          </form>
        </ComponentCard>
      </div>
    </div>
  );
}

export default TransectionForm;
