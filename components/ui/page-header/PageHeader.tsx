"use client";

import { ReactNode } from "react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type PageHeaderProps = {
  title: string;
  description?: string;
  backButton?: boolean;
  rightAction?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  backButton = false,
  rightAction,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {backButton && (
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <h1 className="text-2xl font-bold text-gray-900">
            {title}
          </h1>
        </div>

        {description && (
          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      {rightAction && (
        <div className="shrink-0">
          {rightAction}
        </div>
      )}
    </div>
  );
}