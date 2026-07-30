// components/daily/DailyDateNavigator.tsx

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";

type Props = {
  selectedDate: Date;
  onPrevious?: () => void;
  onNext?: () => void;
};

export function DailyDateNavigator({
  selectedDate,
  onPrevious,
  onNext,
}: Props) {
  const formattedDate = new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDate);

  return (
    <Card className="flex items-center justify-between px-5 py-4">
      <button
        type="button"
        onClick={onPrevious}
        className="rounded-lg p-2 hover:bg-slate-100"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        className="rounded-lg px-3 py-2 font-semibold hover:bg-slate-100"
      >
        {formattedDate}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled
        className="rounded-lg p-2 text-slate-300"
      >
        <ChevronRight size={20} />
      </button>
    </Card>
  );
}
