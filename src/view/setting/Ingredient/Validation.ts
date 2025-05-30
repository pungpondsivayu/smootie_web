import * as Yup from 'yup';

export const SaveIngredientSchema = Yup.object().shape({
  name: Yup.string().required("name is Required"),
  unit: Yup.string().required("unit is Required"),
});