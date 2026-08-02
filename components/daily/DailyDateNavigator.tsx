// components/daily/DailyDateNavigator.tsx
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card } from "@/components/ui";

import { useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();

  const searchParams = useSearchParams();

  function changeDate(days: number) {
    const date = new Date(selectedDate);

    date.setDate(date.getDate() + days);

    const value = date.toISOString().split("T")[0];

    const params = new URLSearchParams(searchParams.toString());

    params.set("date", value);

    router.push(`/daily?${params}`);
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const isToday = selectedDate.toDateString() === today.toDateString();

  return (
    <Card className="flex items-center justify-between px-5 py-4">
      <button
        type="button"
        onClick={() => changeDate(-1)}
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
        onClick={() => changeDate(1)}
        className={`rounded-lg p-2 transition ${
          isToday
            ? "cursor-not-allowed text-slate-300"
            : "text-slate-700 hover:bg-slate-100"
        }`}
        disabled={isToday}
      >
        <ChevronRight size={20} />
      </button>
    </Card>
  );
}
