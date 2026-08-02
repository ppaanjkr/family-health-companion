"use client";

import Link from "next/link";

import type { HealthProfile } from "@/types/profile";

type Props = {
  members: HealthProfile[];
  selectedId?: string;
};

export default function HealthMemberSelector({
  members,
  selectedId,
}: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {members.map((member) => (
        <Link
          key={member.id}
          href={`/?member=${member.id}`}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
            selectedId === member.id
              ? "border-sky-500 bg-sky-500 text-white"
              : "border-slate-300 bg-white hover:bg-slate-50"
          }`}
        >
          {member.nickname}
        </Link>
      ))}
    </div>
  );
}