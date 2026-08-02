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
  multiple?: boolean;
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
  multiple = true,
}: FormCheckboxGroupProps<T>) {
  const error = form.formState.errors[name]?.message as
    | string
    | undefined;

  const selected =
    (form.watch(name) as string[]) ?? [];

  const validate = (values: string[]) => {
    if (!required) return true;

    return values.length > 0
      ? true
      : `กรุณาเลือก${label ?? "ข้อมูล"}`;
  };

  const toggleValue = (value: string) => {
    let values: string[];

    if (multiple) {
      if (selected.includes(value)) {
        values = selected.filter(
          (v) => v !== value,
        );
      } else {
        values = [...selected, value];
      }
    } else {
      values = selected.includes(value)
        ? []
        : [value];
    }

    form.setValue(name, values as never, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    const result = validate(values);

    if (result !== true) {
      form.setError(name, {
        type: "required",
        message: result,
      });
    } else {
      form.clearErrors(name);
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
              } ${
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
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