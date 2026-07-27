"use client";

import { db } from "@/lib/firebase/config";

export default function TestPage() {
  console.log(db);

  return (
    <div className="p-8">
      Firebase Connected ✅
    </div>
  );
}