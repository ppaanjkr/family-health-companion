"use client";

import Link from "next/link";
import { CalendarDays, Wallet } from "lucide-react";

import { Card } from "@/components/ui";

import { ROUTES } from "@/constants/routes";

export default function QuickAccess() {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-lg font-semibold">
        เมนูลัด
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <Link href={ROUTES.DAILY}>
          <Card className="rounded-3xl p-5 transition hover:ring-2 hover:ring-sky-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <CalendarDays size={24} />
            </div>

            <h3 className="mt-4 font-semibold">
              บันทึกสุขภาพ
            </h3>
          </Card>
        </Link>

        <Link href={ROUTES.EXPENSES}>
          <Card className="rounded-3xl p-5 transition hover:ring-2 hover:ring-sky-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Wallet size={24} />
            </div>

            <h3 className="mt-4 font-semibold">
              บันทึกค่าใช้จ่าย
            </h3>
          </Card>
        </Link>
      </div>
    </section>
  );
}