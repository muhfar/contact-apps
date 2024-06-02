import { ContactDataType } from "@/types";
import { Control, FieldPath } from "react-hook-form";
import { KeyboardType } from "react-native";

export type TextFieldProps = {
  label: string;
  name: FieldPath<ContactDataType>;
  control: Control<ContactDataType>;
  placeholder?: string;
  disabled?: boolean;
  keyboardType?: KeyboardType;
};
