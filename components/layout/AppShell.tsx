// components/layout/AppShell.tsx
import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f4f8fc] text-slate-900">
      <main className="mx-auto min-h-screen w-full max-w-lg px-5 pb-28 pt-8 sm:px-7 sm:pt-10">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
