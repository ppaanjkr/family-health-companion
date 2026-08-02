"use client";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export type ToastItem = {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
};

export type ToastOptions = {
  title?: string;
  message: string;
};

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];

const listeners = new Set<Listener>();

function notify() {
  const snapshot = [...toasts];

  listeners.forEach((listener) => {
    listener(snapshot);
  });
}

export function remove(id: string): void {
  toasts = toasts.filter(
    (toast) => toast.id !== id,
  );

  notify();
}

function show(
  type: ToastType,
  options: ToastOptions,
): void {
  const id =
    crypto.randomUUID?.() ??
    `${Date.now()}-${Math.random()}`;

  const toast: ToastItem = {
    id,
    type,
    title: options.title,
    message: options.message,
  };

  toasts = [...toasts, toast];

  notify();

  window.setTimeout(() => {
    remove(id);
  }, 3000);
}

export function subscribe(
  listener: Listener,
): () => void {
  listeners.add(listener);

  listener([...toasts]);

  return () => {
    listeners.delete(listener);
  };
}

export const toast = {
  success(options: ToastOptions) {
    show("success", options);
  },

  error(options: ToastOptions) {
    show("error", options);
  },

  warning(options: ToastOptions) {
    show("warning", options);
  },

  info(options: ToastOptions) {
    show("info", options);
  },
};