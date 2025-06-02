import React, { useEffect, useState } from "react";
import { IDropDown, IPagin, IResponse } from "../../@types/global";
import { useLazyGetDropdownQuery } from "../../controller/Category.Controllers";
import Button from "../../components/ui/button/Button";
import Pagination from "../../components/global/Pagination";
import { IAllMenu } from "../../@types/menu/MenuType";
import { useLazyGetMenusQuery } from "../../controller/Menu.Controllers";
import { useDebounce } from "use-debounce";
import Input from "../../components/form/input/InputField";
import button from "../../assets/sale/beep-29.mp3";
import { IOrderItem, IAllOrder, IAlleSavOrder } from "../../@types/order/OrderType";
import { useSaveOrderMutation } from "../../controller/Order.Controllers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/store/hook";

interface SearchProps {
  name: string;
  categoryId: number;
}

const MainSale: React.FC = () => {
  const navigate = useNavigate();
  const [orderItem, setOrderItem] = useState<IOrderItem[]>([]);
  const { user }: any = useAppSelector((state) => state.auth);
  const [data, setData] = useState<IAllMenu[]>([]);
  const [categoryDropdown, setCategoryDropdown] = useState<IDropDown[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 50,
    totalRows: 0,
    totalPages: 0,
  });

  const [search, setSearch] = useState<SearchProps>({
    name: "",
    categoryId: 0,
  });
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("cash");
  const subtotal = orderItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const total = subtotal + tax;
  const [paidAmount, setPaidAmount] = useState("");
  const change = parseFloat(paidAmount || "0") - total;

  const [debouncedSearch] = useDebounce(search, 500);

  // use query
  const [getMenus] = useLazyGetMenusQuery();
  const [getCategoryDropdown] = useLazyGetDropdownQuery();
  const [SaveOrder] = useSaveOrderMutation();

  //function
  const fetchCategoriesDropdown = async () => {
    const res = await getCategoryDropdown(null);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setCategoryDropdown(data);
    }
  };

  const fetchAllMenus = async (
    pageSize: number,
    currentPage: number,
    name: string,
    categoryId: number
  ) => {
    const res = await getMenus({
      pageSize,
      currentPage,
      name,
      categoryId,
    });
    if (res.data && !res.isError) {
      const { data, pagin } = res.data;
      setData(data);
      setPagin(pagin);
    }
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchAllMenus(pageSize, page, search.name, search.categoryId);
  };

  const addToOrder = (item: IAllMenu) => {
    setOrderItem((prev) => {
      const existing = prev.find((o) => o.menuId === item.menuId);
      if (existing) {
        return prev.map((o) =>
          o.menuId === item.menuId ? { ...o, quantity: o.quantity + 1 } : o
        );
      } else {
        return [
          ...prev,
          {
            menuId: item.menuId,
            name: item.name,
            price: item.price,
            quantity: 1,
          },
        ];
      }
    });
    SoundClick()
  };

  const changeQuantity = (index: number, amount: number) => {
    setOrderItem((prev) => {
      const updated = [...prev];
      updated[index].quantity += amount;
      if (updated[index].quantity <= 0) updated.splice(index, 1);
      return updated;
    });
  };

  const submitOrder = async () => {
    const orderData: IAlleSavOrder = {
      customerId: null,
      branchId: user?.branchId,
      orderTime: new Date().toISOString(),
      channel: "POS",
      paymentMethod: paymentMethod,
      pickupMethod: "pickup",
      totalAmount: subtotal,
      discountAmount: 0,
      finalAmount: total,
      couponId: null,
      pointsEarned: 0,
      pointsUsed: 0,
      status: "paid",
      pickupTime: null,
      deliveryStatus: "",
      orderItems: orderItem.map(({ menuId, quantity, price }) => ({
        orderId: 0,
        menuId,
        quantity,
        price,
      })),
    };
    const response: IResponse<any> = await SaveOrder(orderData);
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate("/order");
        }, 1000);
      }
    } else {
      toast.error(response.error.data.message);
    }
  };

  function SoundClick() {
    const sound = new Audio();
    sound.src = button;
    sound.play();
  }

  useEffect(() => {
    fetchCategoriesDropdown();
    fetchAllMenus(10, 1, "", 0);
  }, []);

  useEffect(() => {
    fetchAllMenus(
      pagin.pageSize,
      pagin.currentPage,
      search.name,
      search.categoryId
    );
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-6 font-sans">
      {/* Menu List */}
      <div className="md:w-2/3 w-full p-4 space-y-3">
        <div className="flex gap-2 mb-6 flex-wrap">
          {categoryDropdown.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setSearch((prev) => ({ ...prev, categoryId: item.value }))
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
        ${
          search.categoryId === item.value
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
            >
              {item.label}
            </button>
          ))}

          {categoryDropdown.length > 0 && (
            <button
              onClick={() => setSearch({ name: "", categoryId: 0 })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
        ${
          search.categoryId === 0
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
            >
              ล้างค่า
            </button>
          )}
        </div>

        <Input
          placeholder="ค้นหาชื่อเมนู"
          onChange={(e) =>
            setSearch((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full bg-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((menu, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg"
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-40 object-contain rounded-md mb-2"
              />
              <h4 className="text-lg font-medium">{menu.name}</h4>
              <p className="text-gray-600">{menu.price.toFixed(2)} ฿</p>
              <Button
                size="sm"
                variant="primary"
                onClick={() => addToOrder(menu)}
                className="w-full rounded-xl mt-3"
              >
                + เพิ่ม
              </Button>
            </div>
          ))}
        </div>

        <Pagination pagin={pagin} onChange={handlePaginationChange} />
      </div>
      <div className="md:w-1/3 w-full bg-white p-6 rounded-2xl shadow-xl mt-6 md:mt-0 space-y-6">
        <h3 className="text-xl font-bold text-gray-800">🧾 คำสั่งซื้อ</h3>

        {/* Order Items */}
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
          {orderItem.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">
                  ฿{item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQuantity(idx, -1)}
                  className="w-7 h-7 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                >
                  −
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(idx, 1)}
                  className="w-7 h-7 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                ฿{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">วิธีชำระเงิน</p>
          <div className="flex gap-3">
            {["online", "cash"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method as "online" | "cash")}
                className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 font-medium text-sm ${
                  paymentMethod === method
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {method === "online" ? "Online" : "Cash"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>฿{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax 7%</span>
            <span>฿{tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center font-bold text-lg text-gray-800">
          <span>Total</span>
          <span>฿{total.toFixed(2)}</span>
        </div>
        {/* รับเงินจากลูกค้า */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            รับเงินจากลูกค้า (บาท)
          </label>

          {/* ปุ่มกดเงิน */}
          <div className="flex gap-2 flex-wrap">
            {[1,5,10,20, 50, 100, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setPaidAmount((prev) =>
                    (parseFloat(prev || "0") + amount).toFixed(2)
                  );
                  SoundClick();
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium shadow"
              >
                +{amount}
              </button>
            ))}
            <button
              onClick={() => {
                setPaidAmount("");
                SoundClick();
              }}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm font-medium shadow"
            >
              ล้าง
            </button>
          </div>

          {/* ช่อง input */}
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกจำนวนเงินที่รับมา"
          />

          {/* เงินทอน */}
          <div className="text-sm text-gray-600 flex justify-between">
            <span>เงินทอน</span>
            <span
              className={`font-medium ${
                change < 0 ? "text-red-500" : "text-green-600"
              }`}
            >
              {change >= 0 ? `฿${change.toFixed(2)}` : "เงินไม่พอ"}
            </span>
          </div>
        </div>

        {/* Submit */}
        <Button
          size="sm"
          variant="primary"
          onClick={submitOrder}
          className="w-full rounded-xl"
        >
          ยืนยันคำสั่งซื้อ
        </Button>
      </div>
    </div>
  );
};

export default MainSale;
