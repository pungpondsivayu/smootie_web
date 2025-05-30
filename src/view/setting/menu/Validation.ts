import * as Yup from 'yup';

export const SaveMenuSchema = Yup.object().shape({
  Name : Yup.string().required("name  is Required"),
  Price : Yup.number().min(1 , "price is Required").required("price is Required"),
  CategoryId : Yup.number().min(1 , "categoryId is Required").required("categoryId is Required"),
});