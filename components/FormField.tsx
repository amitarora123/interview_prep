import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem as ShadFormItem,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormItemProps<T extends FieldValues> {
  type: string;
  name: FieldPath<T>; // ensures name matches form fields
  control: Control<T>;
  label: string
}

const FormItem = <T extends FieldValues>({
  type,
  name,
  control,
  label
}: FormItemProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <ShadFormItem>
          <FormLabel className="label text-indigo-200">{label}</FormLabel>
          <FormControl>
            <Input
              className="input placeholder:text-indigo-200 rounded-full p-6 text-lg"
              type={type}
              placeholder={`Your ${label}`}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </ShadFormItem>
      )}
    />
  );
};

export default FormItem;
