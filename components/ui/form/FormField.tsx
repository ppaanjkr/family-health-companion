"use client";

import { ReactNode } from "react";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export default function FormField({
  label,
  required = false,
  error,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}