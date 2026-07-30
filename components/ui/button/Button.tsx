"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "line";
  outline?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  outline = false,
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: outline
      ? "border border-sky-500 bg-white text-sky-500 hover:bg-sky-50 disabled:border-sky-300 disabled:text-sky-300"
      : "bg-sky-500 text-white hover:bg-sky-600 disabled:bg-sky-300",

    secondary: outline
      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300",

    danger: outline
      ? "border border-red-600 bg-white text-red-600 hover:bg-red-50 disabled:border-red-300 disabled:text-red-300"
      : "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",

    line: outline
      ? "border border-[#06C755] bg-white text-[#06C755] hover:bg-[#e9f9ef]"
      : "bg-[#06C755] text-white hover:bg-[#05b64d]",
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        font-medium
        transition-colors
        duration-200
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {!loading && leftIcon}

      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-80"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}

      <span>{children}</span>

      {!loading && rightIcon}
    </button>
  );
}
