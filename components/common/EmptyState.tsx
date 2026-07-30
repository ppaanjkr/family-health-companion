import { ReactNode } from "react";

import { Button, Card } from "@/components/ui";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="py-16 text-center">
      <div className="text-5xl">
        {icon ?? "📭"}
      </div>

      <h2 className="mt-4 text-xl font-semibold">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-slate-500">
          {description}
        </p>
      )}

      {actionText && onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </Card>
  );
}