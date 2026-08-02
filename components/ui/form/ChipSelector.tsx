"use client";

type ChipOption = {
  value: string;
  label: string;
  subtitle?: string;
};

type ChipSelectorProps = {
  label?: string;
  required?: boolean;
  options: ChipOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  disabled?: boolean;
};

export default function ChipSelector({
  label,
  required = false,
  options,
  value,
  onChange,
  error,
  disabled = false,
}: ChipSelectorProps) {
  function toggle(optionValue: string) {
    if (disabled) return;

    if (value.includes(optionValue)) {
      onChange(
        value.filter((v) => v !== optionValue),
      );
    } else {
      onChange([...value, optionValue]);
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(
            option.value,
          );

          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() =>
                toggle(option.value)
              }
              className={`rounded-xl border px-4 py-2 text-left transition-colors ${
                selected
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              } ${
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              <div className="font-medium">
                {option.label}
              </div>

              {option.subtitle && (
                <div
                  className={`text-xs ${
                    selected
                      ? "text-sky-100"
                      : "text-slate-500"
                  }`}
                >
                  {option.subtitle}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}