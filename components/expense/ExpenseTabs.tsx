type TabButtonProps = {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

export default function TabButton({
  active,
  icon,
  label,
  onClick,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all",
        active
          ? "bg-white text-primary shadow-sm"
          : "text-gray-500 hover:text-gray-700",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}