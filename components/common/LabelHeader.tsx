// components/common/LabelHeader.tsx
interface Props{
    label: string
}
export default function LabelHeader({label}: Props) {
    return (
        <h2 className="text-lg font-semibold border-l-4 border-sky-500 pl-3">
        {label}
      </h2>
    );
}