"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import FormField from "./FormField";

import { FormOption } from "./types";

interface FormSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;

  name: Path<T>;

  label: string;

  options: readonly FormOption[];

  required?: boolean;

  placeholder?: string;

  disabled?: boolean;

  className?: string;
}

export default function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
  required = false,
  placeholder = "กรุณาเลือก",
  disabled = false,
  className = "",
}: FormSelectProps<T>) {
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      <select
        disabled={disabled}
        {...form.register(name, {
          required: required ? `กรุณาเลือก${label}` : false,
        })}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
