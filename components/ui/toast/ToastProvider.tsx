"use client";

import ToastContainer from "./ToastContainer";

type ToastProviderProps = {
  children?: React.ReactNode;
};

export default function ToastProvider({
  children,
}: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}