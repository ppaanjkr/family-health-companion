// app/daily/page.tsx
import Link from "next/link";

import { Plus } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { Card, PageHeader } from "@/components/ui";
import { DailyDateNavigator, DailyProfileCard } from "@/components/daily";
import { ROUTES } from "@/constants/routes";
import { formatThaiDate, getRecordDate } from "@/lib/utils/date";
import { getDailyRecordsByDate } from "@/services/daily/daily.service";
import { getPersonProfiles } from "@/services/profile/profile.service";

export default async function DailyPage() {
  const selectedDate = new Date();

  const recordDate = getRecordDate(selectedDate);

  const [profiles, records] = await Promise.all([
    getPersonProfiles(),
    getDailyRecordsByDate(recordDate),
  ]);

  return (
    <AppShell>
      <PageHeader
        title="บันทึกประจำวัน"
        description="บันทึกข้อมูลสุขภาพของสมาชิกในแต่ละวัน"
      />

      <div className="mt-6">
        <DailyDateNavigator selectedDate={selectedDate} />
      </div>

      {profiles.length === 0 ? (
        <Card className="mt-6 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <Plus size={24} />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            ยังไม่มีสมาชิกให้บันทึกข้อมูล
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            เพิ่มสมาชิกประเภทบุคคลก่อน จึงจะสามารถบันทึกข้อมูลสุขภาพประจำวันได้
          </p>

          <Link
            href={ROUTES.FAMILY}
            className="mt-5 inline-flex rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-600"
          >
            ไปหน้าครอบครัว
          </Link>
        </Card>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {profiles.map((profile) => {
            const record = records.find((r) => r.profileId === profile.id);

            return (
              <DailyProfileCard
                key={profile.id}
                profile={profile}
                record={record}
              />
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
