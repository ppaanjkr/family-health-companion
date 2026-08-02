// components/ui/form/FormDateInput.tsx
"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import FormField from "./FormField";

interface FormDateInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;

  name: Path<T>;

  label: string;

  required?: boolean;

  disabled?: boolean;

  className?: string;
}

export default function FormDateInput<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  disabled = false,
  className = "",
}: FormDateInputProps<T>) {
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      <input
        type="date"
        disabled={disabled}
        {...form.register(name, {
          required: required ? `กรุณาเลือก${label}` : false,
        })}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
      />
    </FormField>
  );
}
