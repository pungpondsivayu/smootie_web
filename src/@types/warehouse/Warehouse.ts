export interface IAllStock {
    stockId: number,
    branchId: number,
    ingredientId: number,
    quantity: number,
    ingredient : ShotIngredient
}

interface ShotIngredient {
  name: string;
  unit: string;
}

export interface IAllTransetion {
  requestId: number;
  employeeId: number;
  branchId: number;
  requestDate: string;
  status: string;
  approvedBy: string;
  approvedDate: null;
  requestType: string;
  stockRequestItem : IStockRequestItem[]
}


export interface IStockRequestItem {
  itemId: number;
  name: string;
  unit: string;
  quantity: number;
}

export interface IAllCouterStock {
  counterStockId: number;
  branchId: number;
  name: string;
  unit: string;
  ingredientId: number;
  quantity: number;
  lastUpdated: string;
}