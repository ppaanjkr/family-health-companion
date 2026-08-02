"use client";

import { useEffect, useState } from "react";

import ToastItem from "./ToastItem";
import {
  subscribe,
  type ToastItem as ToastItemType,
} from "./toast";

export default function ToastContainer() {
  const [toasts, setToasts] = useState<
    ToastItemType[]
  >([]);

  useEffect(() => {
    const unsubscribe = subscribe(setToasts);

    return unsubscribe;
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-[9999] flex flex-col items-end gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
        >
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
}