"use client";

import LabelHeader from "@/components/common/LabelHeader";
import { ReactNode } from "react";

interface FormSectionProps {
  title?: string;

  description?: string;

  children: ReactNode;

  className?: string;
}

export default function FormSection({
  title,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <section className={`space-y-6 ${className}`}>
      <div>
        <LabelHeader label={title ?? ""} />
        {/* <h2 className="text-lg font-semibold text-slate-800">
          {title}
        </h2> */}

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}