"use client";

import {
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

import FormField from "./FormField";
import { FormOption } from "./types";

interface FormRadioGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: readonly FormOption[];

  variant?: "default" | "card";

  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FormRadioGroup<T extends FieldValues>({
  form,
  name,
  label,
  options,
  variant = "default",
  required = false,
  disabled = false,
  className = "",
}: FormRadioGroupProps<T>) {
  const error = form.formState.errors[name]?.message as
    | string
    | undefined;

  const selected = form.watch(name);

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      {variant === "card" ? (
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => {
            const active = selected === option.value;

            return (
              <label
                key={option.value}
                className={`cursor-pointer rounded-2xl border p-4 text-center transition ${
                  active
                    ? "border-sky-500 bg-sky-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  disabled={disabled}
                  {...form.register(name)}
                  className="sr-only"
                />

                {option.icon && (
                  <div className="text-3xl">
                    {option.icon}
                  </div>
                )}

                <div className={`font-medium ${option.icon && "mt-2"}`}>
                  {option.label}
                </div>
              </label>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-5">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="radio"
                value={option.value}
                disabled={disabled}
                {...form.register(name)}
              />

              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </FormField>
  );
}