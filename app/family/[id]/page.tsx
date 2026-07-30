// app/family/[id]/page.tsx
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/ui";
import {
  HealthProfileHeader,
  HealthProfileBasicInfo,
  HealthProfileActions
} from "@/components/health-profile";
import { getHealthProfileById } from "@/lib/firebase/health-profile";
import { AppShell } from "@/components/layout/AppShell";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FamilyDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const profile = await getHealthProfileById(id);

  if (!profile) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader
        title="ข้อมูลสมาชิก"
        description="รายละเอียดข้อมูลสมาชิกในครอบครัว"
      />

      <div className="space-y-6">
        <HealthProfileHeader profile={profile} />
        
        <HealthProfileActions profileId={profile.id} />

        <HealthProfileBasicInfo profile={profile} />
      </div>
    </AppShell>
  );
}