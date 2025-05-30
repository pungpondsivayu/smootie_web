import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is Required"),
  password: Yup.string().required("password is required"),
});