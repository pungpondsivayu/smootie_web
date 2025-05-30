export interface IAllIngredient {
  ingredientId: number;
  name: string;
  unit: string;
  createdDate: string;
  createdBy: string;
  isUsed: boolean;
}
  
export interface ISaveIngredient {
  ingredientId: number;
  name: string;
  unit: string;
  createdBy: string;
  isUsed: boolean;
}

    