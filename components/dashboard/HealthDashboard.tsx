import { Card } from "@/components/ui";

import HealthMetricCard from "./HealthMetricCard";
import HealthHistoryChart from "./HealthHistoryChart";

import type { DailyRecord } from "@/types/daily";

type Props = {
  selected: boolean;
  today: DailyRecord | null;
  history: DailyRecord[];
  children: React.ReactNode;
};

export default function HealthDashboard({
  selected,
  today,
  history,
  children,
}: Props) {
  const pressureHistory = history.map((item) => ({
    date: item.recordDate.slice(8),
    systolic: item.systolic,
    diastolic: item.diastolic,
  }));

  const pulseHistory = history.map((item) => ({
    date: item.recordDate.slice(8),
    pulse: item.pulse,
  }));

  const spo2History = history.map((item) => ({
    date: item.recordDate.slice(8),
    spo2: item.spo2,
  }));

  const temperatureHistory = history.map((item) => ({
    date: item.recordDate.slice(8),
    temperature: item.temperature,
  }));

  const weightHistory = history.map((item) => ({
    date: item.recordDate.slice(8),
    weight: item.weight,
  }));

  const sugarHistory = history.map((item) => ({
    date: item.recordDate.slice(8),
    bloodSugar: item.bloodSugar,
  }));

  return (
    <Card className="mt-6 rounded-3xl p-5">
      <h2 className="text-lg font-semibold">
        ประวัติสุขภาพ
      </h2>

      <div className="mt-4">
        {children}
      </div>

      {!selected ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-slate-600">
            เลือกสมาชิกเพื่อดูข้อมูลสุขภาพ
          </p>

          <p className="mt-2 text-sm text-slate-400">
            เมื่อเลือกสมาชิกแล้ว ระบบจะแสดงข้อมูลล่าสุดและกราฟย้อนหลัง
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">
              ข้อมูลล่าสุด
            </h3>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              <HealthMetricCard
                title="ความดัน"
                value={
                  today
                    ? `${today.systolic}/${today.diastolic}`
                    : null
                }
              />

              <HealthMetricCard
                title="ชีพจร"
                value={today?.pulse}
                unit="bpm"
              />

              <HealthMetricCard
                title="ออกซิเจน"
                value={today?.spo2}
                unit="%"
              />

              <HealthMetricCard
                title="อุณหภูมิ"
                value={today?.temperature}
                unit="°C"
              />

              <HealthMetricCard
                title="น้ำหนัก"
                value={today?.weight}
                unit="kg"
              />

              <HealthMetricCard
                title="น้ำตาล"
                value={today?.bloodSugar}
                unit="mg/dL"
              />
            </div>
          </div>

          {history.length > 0 && (
            <div className="mt-6 space-y-4">
              <HealthHistoryChart
                title="ความดัน"
                data={pressureHistory}
                lines={[
                  {
                    key: "systolic",
                    name: "SYS",
                    color: "#0284c7",
                  },
                  {
                    key: "diastolic",
                    name: "DIA",
                    color: "#ef4444",
                  },
                ]}
              />

              <HealthHistoryChart
                title="ชีพจร"
                data={pulseHistory}
                lines={[
                  {
                    key: "pulse",
                    name: "ชีพจร",
                    color: "#0284c7",
                  },
                ]}
              />

              <HealthHistoryChart
                title="ออกซิเจนในเลือด"
                data={spo2History}
                lines={[
                  {
                    key: "spo2",
                    name: "SpO₂",
                    color: "#10b981",
                  },
                ]}
              />

              <HealthHistoryChart
                title="อุณหภูมิ"
                data={temperatureHistory}
                lines={[
                  {
                    key: "temperature",
                    name: "อุณหภูมิ",
                    color: "#f97316",
                  },
                ]}
              />

              <HealthHistoryChart
                title="น้ำหนัก"
                data={weightHistory}
                lines={[
                  {
                    key: "weight",
                    name: "น้ำหนัก",
                    color: "#8b5cf6",
                  },
                ]}
              />

              <HealthHistoryChart
                title="น้ำตาลในเลือด"
                data={sugarHistory}
                lines={[
                  {
                    key: "bloodSugar",
                    name: "น้ำตาล",
                    color: "#ec4899",
                  },
                ]}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
}