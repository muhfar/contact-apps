import React from "react";
import { useController } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { TextFieldProps } from "./TextField.types";

const TextField = (props: TextFieldProps): React.JSX.Element => {
  const { field } = useController({
    control: props.control,
    name: props.name,
    defaultValue: props.control._defaultValues[props.name]
  });

  return (
    <TextInput
      mode="outlined"
      dense
      label={props.label}
      placeholder={props.placeholder || props.label}
      value={String(field.value)}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      ref={field.ref}
      disabled={props.disabled}
      keyboardType={props.keyboardType || "default"}
    />
  );
};

export default TextField;
