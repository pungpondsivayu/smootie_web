import * as Yup from 'yup';

export const SaveBranchSchema = Yup.object().shape({
  province: Yup.string().required("province is Required"),
  district: Yup.string().required("district is Required"),
  subDistrict: Yup.string().required("subDistrict is Required"),
  postalCode: Yup.string().required("postalCode is Required"),
});