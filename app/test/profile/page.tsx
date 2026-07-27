"use client";

import { useEffect } from "react";
import { getProfiles } from "@/services/profile/profile.service";

export default function TestPage() {
  useEffect(() => {
    async function load() {
      const data = await getProfiles();

      console.log(data);
    }

    load();
  }, []);

  return <div>Testing...</div>;
}