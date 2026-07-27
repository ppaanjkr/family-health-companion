// components/ui/Avatar.tsx
type AvatarProps = {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-xl",
  lg: "h-20 w-20 text-2xl",
};

export function Avatar({ name, imageUrl, size = "md" }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      aria-label={`รูปโปรไฟล์ของ ${name}`}
      className={`${sizeClasses[size]} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100 font-semibold text-sky-700`}
      role="img"
      style={
        imageUrl
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : undefined
      }
    >
      {!imageUrl && initial}
    </div>
  );
}
