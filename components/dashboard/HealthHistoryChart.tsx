"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui";

type ChartLine = {
  key: string;
  color: string;
  name: string;
};

type Props = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  lines: ChartLine[];
};

export default function HealthHistoryChart({
  title,
  data,
  lines,
}: Props) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="">
      <h3 className="mb-4 font-semibold">
        {title}
      </h3>

      <div className="h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            {lines.map((line) => (
              <Line
                key={line.key}
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}