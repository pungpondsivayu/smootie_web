import React from "react";
import { useLocation } from "react-router";
import { formatDateTimeLocalized } from "../../utils/date/formatDate";
import { IAllOrder } from "../../@types/order/OrderType";

const OrderDetail: React.FC = () => {
  const location = useLocation();
  const order: IAllOrder = location.state.order ?? null;
    console.log(order)
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        <i className="fas fa-receipt text-indigo-500 mr-2"></i>
        Order Details #{order.orderId}
      </h2>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-gray-700">
        <div className="space-y-2">
          <p><i className="fas fa-store mr-2 text-indigo-500" /> <span className="font-semibold">Branch:</span> {order.branchId}</p>
          <p><i className="fas fa-clock mr-2 text-indigo-500" /> <span className="font-semibold">Date:</span> {formatDateTimeLocalized(order.orderTime, { lang: "en", yearType: "AD" })}</p>
          <p><i className="fas fa-desktop mr-2 text-indigo-500" /> <span className="font-semibold">Channel:</span> {order.channel}</p>
          <p><i className="fas fa-info-circle mr-2 text-indigo-500" /> <span className="font-semibold">Status:</span> <span className="text-green-600 font-medium">{order.status}</span></p>
        </div>
        <div className="space-y-2">
          <p><i className="fas fa-credit-card mr-2 text-indigo-500" /> <span className="font-semibold">Payment:</span> {order.paymentMethod}</p>
          <p><i className="fas fa-box-open mr-2 text-indigo-500" /> <span className="font-semibold">Pickup Method:</span> {order.pickupMethod}</p>
          <p><i className="fas fa-minus-circle mr-2 text-indigo-500" /> <span className="font-semibold">Points Used:</span> {order.pointsUsed}</p>
          <p><i className="fas fa-plus-circle mr-2 text-indigo-500" /> <span className="font-semibold">Points Earned:</span> {order.pointsEarned}</p>
        </div>
      </div>

      {/* Order Items */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
        <i className="fas fa-shopping-cart mr-2 text-indigo-500" /> Items
      </h3>
      <div className="space-y-4">
        {order.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm transition hover:shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-xl mr-4 border"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-lg">{item.name}</p>
              <p className="text-gray-500">
                Quantity: {item.quantity} × ฿{item.price}
              </p>
            </div>
            <div className="text-right font-bold text-gray-700 text-lg">
              ฿{(item.quantity * item.price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 border-t pt-6 space-y-2 text-lg">
        <div className="flex justify-between text-gray-600">
          <span>Total:</span>
          <span className="font-medium text-gray-700">฿{order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Discount:</span>
          <span className="font-medium text-gray-700">฿{order.discountAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-green-700 text-xl pt-2 border-t">
          <span>Final Amount:</span>
          <span>฿{order.finalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
