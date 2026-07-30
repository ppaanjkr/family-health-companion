"use client";

import {
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

import FormField from "./FormField";

type Option = {
  value: string;
  label: string;
};

interface FormCheckboxGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;

  name: Path<T>;

  label?: string;

  options: readonly Option[];

  required?: boolean;

  disabled?: boolean;

  className?: string;
}

export default function FormChipGroup<
  T extends FieldValues,
>({
  form,
  name,
  label,
  options,
  required = false,
  disabled = false,
  className = "",
}: FormCheckboxGroupProps<T>) {
  const error = form.formState.errors[name]?.message as
    | string
    | undefined;

  const selected =
    (form.watch(name) as string[]) ?? [];

  const toggleValue = (value: string) => {
    const values = [...selected];

    if (values.includes(value)) {
      form.setValue(
        name,
        values.filter((v) => v !== value) as never,
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );
    } else {
      form.setValue(
        name,
        [...values, value] as never,
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );
    }
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(
            option.value,
          );

          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() =>
                toggleValue(option.value)
              }
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-slate-300 bg-white hover:border-sky-400"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </FormField>
  );
}