// app/family/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import HealthProfileCard from "@/components/health-profile/HealthProfileCard";

import { getProfiles } from "@/services/profile/profile.service";
import { HealthProfile } from "@/types/profile";
import { Button, Card, PageHeader } from "@/components/ui";
import { Heart, Plus } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function FamilyPage() {
  const router = useRouter();

  const [profiles, setProfiles] = useState<HealthProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);

        const data = await getProfiles();
        setProfiles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <AppShell>
      <PageHeader
        title="สมาชิกข้อมูลสุขภาพ"
        backButton
      />

      <div className="mt-6">
        <Link href={ROUTES.FAMILY_NEW}>
          <Button className="w-full">
            เพิ่มสมาชิก
          </Button>
        </Link>
      </div>

      {loading ? (
        <Card className="mt-8 p-8 text-center ring-1 ring-slate-100">
          <p className="text-slate-500">กำลังโหลดข้อมูล...</p>
        </Card>
      ) : profiles.length === 0 ? (
        <Card className="mt-8 p-7 text-center ring-1 ring-slate-100">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-600">
            <Heart width={24} />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            เริ่มเพิ่มสมาชิกในครอบครัว
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            เก็บบันทึกสุขภาพของทุกคนในที่เดียว รวมถึงสัตว์เลี้ยงได้
          </p>

          <Button
            className="mt-6"
            leftIcon={<Plus size={18} />}
            onClick={() => router.push("/family/create")}
          >
            เพิ่มสมาชิกคนแรก
          </Button>
        </Card>
      ) : (
        <div className="mt-8 space-y-4">
          {profiles.map((profile) => (
            <HealthProfileCard
              key={profile.id}
              profile={profile}
              onClick={() => router.push(`/family/${profile.id}`)}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}
