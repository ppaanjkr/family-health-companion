"use client";

import { HTMLAttributes, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
  backButton?: boolean;
}

export default function PageHeader({
  title,
  description,
  action,
  backButton = false,
  className = "",
  ...props
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div
      className={`mb-6 flex items-center justify-between gap-4 ${className}`}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {backButton && (
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl p-2 transition hover:bg-gray-100 active:scale-95"
            aria-label="ย้อนกลับ"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>

      {action && <div className="flex shrink-0 items-center">{action}</div>}
    </div>
  );
}
