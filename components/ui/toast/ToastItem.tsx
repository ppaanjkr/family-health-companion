"use client";

import { CircleAlert, CircleCheckBig, CircleX, Info, X } from "lucide-react";

import { remove, type ToastItem as ToastItemType } from "./toast";

type ToastItemProps = {
  toast: ToastItemType;
};

const styles = {
  success: {
    container: "border-green-200 bg-green-50 text-green-900",
    icon: CircleCheckBig,
  },
  error: {
    container: "border-red-200 bg-red-50 text-red-900",
    icon: CircleX,
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-900",
    icon: CircleAlert,
  },
  info: {
    container: "border-sky-200 bg-sky-50 text-sky-900",
    icon: Info,
  },
};

export default function ToastItem({ toast }: ToastItemProps) {
  const style = styles[toast.type];
  const Icon = style.icon;

  return (
    <div
      className={`flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg ${style.container}`}
    >
      <div className="mt-0.5 shrink-0">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        {toast.title && (
          <div className="text-sm font-semibold">{toast.title}</div>
        )}

        <div className={`break-words text-sm ${toast.title ? "mt-1" : ""}`}>
          {toast.message}
        </div>
      </div>

      <button
        type="button"
        onClick={() => remove(toast.id)}
        className="rounded-md p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
