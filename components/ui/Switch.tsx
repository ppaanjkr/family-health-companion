"use client";

type SwitchProps = {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (
    checked: boolean,
  ) => void;
};

export default function Switch({
  checked,
  disabled = false,
  onCheckedChange,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() =>
        !disabled &&
        onCheckedChange?.(!checked)
      }
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer"
      } ${
        checked
          ? "bg-sky-500"
          : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
          checked
            ? "translate-x-6"
            : "translate-x-1"
        }`}
      />
    </button>
  );
}