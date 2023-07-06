import * as Yup from 'yup';
import { RegExp } from '../../utils/utils';

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(RegExp.PASSWORD)
    .min(6),
});
