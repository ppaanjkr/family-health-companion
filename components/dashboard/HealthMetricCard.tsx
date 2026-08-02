import { Card } from "@/components/ui";

type Props = {
  title: string;
  value?: string | number | null;
  unit?: string;
};

export default function HealthMetricCard({
  title,
  value,
  unit,
}: Props) {
  return (
    <Card className="rounded-2xl p-4">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value ?? "-"}
        {value && unit ? (
          <span className="ml-1 text-base font-medium text-slate-500">
            {unit}
          </span>
        ) : null}
      </p>
    </Card>
  );
}