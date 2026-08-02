"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import FormField from "./FormField";

interface FormTextareaProps<T extends FieldValues> {
  form: UseFormReturn<T>;

  name: Path<T>;

  label?: string;

  required?: boolean;

  placeholder?: string;

  rows?: number;

  disabled?: boolean;

  className?: string;
}

export default function FormTextarea<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  placeholder,
  rows = 4,
  disabled = false,
  className = "",
}: FormTextareaProps<T>) {
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      <textarea
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        {...form.register(name, {
          required: required ? `กรุณากรอก${label}` : false,
        })}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
      />
    </FormField>
  );
}
