import { auth } from "@/auth";
import { Avatar } from "@/components/ui/Avatar";
import { AppShell } from "@/components/layout/AppShell";
import { ROUTES } from "@/constants/routes";
import { getUserByLineUserId } from "@/services/user/user.service";
import { Card, PageHeader } from "@/components/ui";
import { getCurrentExpenseSummary } from "@/services/dashboard/dashboard.service";
import ExpenseSummaryCard from "@/components/dashboard/ExpenseSummaryCard";
import QuickAccess from "@/components/dashboard/QuickAccess";
import {
  getDashboardHealthMembers,
  getHealthHistory,
  getTodayHealth,
} from "@/services/dashboard/dashboard-health.service";
import HealthMemberSelector from "@/components/dashboard/HealthMemberSelector";
import HealthDashboard from "@/components/dashboard/HealthDashboard";
import { DailyRecord } from "@/types/daily";
import { USER_STATUS } from "@/constants/auth";
import Link from "next/link";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "สวัสดีตอนเช้า";
  if (hour < 17) return "สวัสดีตอนบ่าย";
  return "สวัสดีตอนเย็น";
}

type HomeProps = {
  searchParams: Promise<{
    member?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { member } = await searchParams;

  const session = await auth();
  const lineUserId = session?.user?.lineUserId;
  const user = lineUserId ? await getUserByLineUserId(lineUserId) : null;
  const isActive = user?.status === USER_STATUS.ACTIVE;
  if (!isActive) {
    return (
      <AppShell>
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold">4Ducks</h1>

          <p className="text-center text-slate-500">
            รอฉันรอไปก่อน
          </p>

          {/* <Link
            href="/login"
            className="rounded-2xl border-[#06C755] bg-white text-[#06C755] hover:bg-[#e9f9ef] px-8 py-3 font-semibold"
          >
            เข้าสู่ระบบด้วย LINE
          </Link> */}
        </div>
      </AppShell>
    );
  }

  const displayName = user?.displayName ?? session?.user?.name ?? "คุณ";
  const currentDate = new Intl.DateTimeFormat("th-TH", {
    dateStyle: "full",
  }).format(new Date());

  const [summary, members] = await Promise.all([
    getCurrentExpenseSummary(),
    getDashboardHealthMembers(),
  ]);

  const selectedMember = member ?? null;

  let today = null;
  let history: DailyRecord[] = [];

  if (selectedMember) {
    [today, history] = await Promise.all([
      getTodayHealth(selectedMember),
      getHealthHistory(selectedMember),
    ]);
  }

  return (
    <AppShell>
      <PageHeader
        title={`${getGreeting()} ${displayName}`}
        description={currentDate}
        rightAction={
          <Avatar imageUrl={user?.pictureUrl} name={displayName} size="md" />
        }
      />

      <QuickAccess />

      {summary && (
        <ExpenseSummaryCard
          cycleName={summary.cycleName}
          expenseCount={summary.expenseCount}
          totalAmount={summary.totalAmount}
        />
      )}

      <HealthDashboard
        selected={!!selectedMember}
        today={today}
        history={history}
      >
        <HealthMemberSelector
          members={members}
          selectedId={selectedMember ?? undefined}
        />
      </HealthDashboard>
    </AppShell>
  );
}
