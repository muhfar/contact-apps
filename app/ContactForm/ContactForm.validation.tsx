import * as yup from "yup";

const contactSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/[A-z]/i, "First name should contain only letters")
    .trim(),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/[A-z]/i, "Last name should contain only letters")
    .trim(),
  age: yup
    .number()
    .required()
    .positive("Age must be positive number")
    .lessThan(125, "Age must be less than 125"),
  photo: yup.string().required("Photo is required").url()
});

export default contactSchema;
