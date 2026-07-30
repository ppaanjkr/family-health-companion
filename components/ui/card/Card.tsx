/* eslint-disable @typescript-eslint/no-empty-object-type */
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}