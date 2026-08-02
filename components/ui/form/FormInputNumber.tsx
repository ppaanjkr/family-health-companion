"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import FormField from "./FormField";

interface FormInputNumberProps<T extends FieldValues> {
  form: UseFormReturn<T>;

  name: Path<T>;

  label: string;

  required?: boolean;

  placeholder?: string;

  disabled?: boolean;

  className?: string;

  min?: number;

  max?: number;

  step?: number;

  unit?: string;

  suffix?: string;
}

export default function FormInputNumber<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  placeholder,
  disabled = false,
  className = "",
  min,
  max,
  step = 1,
  unit,
  suffix,
}: FormInputNumberProps<T>) {
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      <div className="relative">
        <input
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          {...form.register(name, {
            required: required ? `กรุณากรอก${label}` : false,

            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100 ${
            suffix ? "pr-14" : ""
          }`}
        />

        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </FormField>
  );
}
