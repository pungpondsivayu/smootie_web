export interface IOrderItem {
    menuId: number;
    name: string;
    price: number;
    quantity: number;
  };

export interface IAlleSavOrder {
  customerId: number | null,
  branchId: number,
  orderTime: string,
  channel: string,
  paymentMethod: string,
  pickupMethod: string,
  totalAmount: number,
  discountAmount: number,
  finalAmount: number,
  couponId: number | null,
  pointsEarned: number,
  pointsUsed: number,
  status: string,
  pickupTime: number | null,
  deliveryStatus: string,
  orderItems: SaveorderItems[]
}

interface SaveorderItems {
  orderId: number;
  menuId: number;
  quantity: number;
  price: number;
}

export interface IAllOrder {
  orderId : number,
  customerId: number | null,
  branchId: number,
  orderTime: string,
  channel: string,
  paymentMethod: string,
  pickupMethod: string,
  totalAmount: number,
  discountAmount: number,
  finalAmount: number,
  couponId: number | null,
  pointsEarned: number,
  pointsUsed: number,
  status: string,
  pickupTime: number | null,
  deliveryStatus: string,
  orderItems: orderItems[]
}

interface orderItems {
  orderId: number;
  menuId: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
}