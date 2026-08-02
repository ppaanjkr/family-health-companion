"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui";
import DailyRecordForm from "@/components/daily/DailyRecordForm";

import {
  getDailyRecord,
  createDailyRecord,
  updateDailyRecord,
} from "@/services/daily/daily.service";

import { getProfile } from "@/services/profile/profile.service";

import type { HealthProfile } from "@/types/profile";
import type { DailyRecord } from "@/types/daily";

import type { DailyRecordFormValues } from "@/components/daily/types";
import { formatThaiDate } from "@/lib/utils/date";
import { format } from "path";

export default function DailyRecordPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const profileId = params.profileId as string;

  const today = new Date().toLocaleDateString("sv-SE");

  const date = searchParams.get("date") ?? today;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<HealthProfile | null>(null);

  const [dailyRecord, setDailyRecord] = useState<DailyRecord | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);

      try {
        const [profileData, recordData] = await Promise.all([
          getProfile(profileId),
          getDailyRecord(profileId, date),
        ]);

        if (cancelled) return;

        setProfile(profileData);
        setDailyRecord(recordData);

      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [profileId, date]);

  async function handleSubmit(data: DailyRecordFormValues) {
    setSaving(true);

    try {
      if (dailyRecord) {
        await updateDailyRecord(dailyRecord.id, data);
      } else {
        await createDailyRecord({
          profileId,
          recordDate: date,
          ...data,
        });
      }

      router.push("/daily");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AppShell>
        <PageHeader title="กำลังโหลด..." backButton />
      </AppShell>
    );
  }

  if (!profile) {
    return (
      <AppShell>
        <PageHeader title="ไม่พบสมาชิก" backButton />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader title={profile.nickname ?? ""} description={formatThaiDate(date)} backButton />

      <DailyRecordForm
        defaultValues={
          dailyRecord
            ? {
                systolic: dailyRecord.systolic,
                diastolic: dailyRecord.diastolic,
                pulse: dailyRecord.pulse,
                spo2: dailyRecord.spo2,
                weight: dailyRecord.weight,
                temperature: dailyRecord.temperature,
                bloodSugar: dailyRecord.bloodSugar,
                symptoms: dailyRecord.symptoms ?? [],
                note: dailyRecord.note ?? "",
              }
            : undefined
        }
        submitting={saving}
        onSubmit={handleSubmit}
      />
    </AppShell>
  );
}
