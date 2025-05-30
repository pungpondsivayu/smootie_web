import * as Yup from 'yup';

export const SaveEmployeeSchema = Yup.object().shape({
  BranchId: Yup.number()
    .min(1, "BranchId is Required")
    .required("BranchId is Required"),
  RoleId: Yup.number()
    .min(1, "RoleId is Required")
    .required("RoleId is Required"),
  Fullname: Yup.string().required("Fullname  is Required"),
  Email: Yup.string().required("Email is Required").email("Email is Required"),
  PhoneNumber: Yup.string().required("PhoneNumber is Required"),
  PasswordHash: Yup.string().required("PasswordHash is Required"),
  HireDate: Yup.string().required("HireDate is Required"),
});