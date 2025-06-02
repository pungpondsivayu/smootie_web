import * as Yup from 'yup';

export const SaveMenuSchema = Yup.object().shape({
  Name : Yup.string().required("name  is Required"),
  Price : Yup.number().min(1 , "price is Required").required("price is Required"),
  CategoryId : Yup.number().min(1 , "categoryId is Required").required("categoryId is Required"),
});

export const SaveMenuRecipeSchema = Yup.object().shape({
menuId : Yup.number().min(1 , "menuId is Required").required("menuId is Required"),
  ingredientId : Yup.number().min(1 , "ingredientId is Required").required("ingredientId is Required"),
  quantity : Yup.number().min(1 , "quantity is Required").required("quantity is Required"),
});

