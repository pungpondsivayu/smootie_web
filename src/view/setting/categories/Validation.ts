import * as Yup from 'yup';

export const SaveCategorySchema = Yup.object().shape({
  name: Yup.string().required("name is Required"),
});