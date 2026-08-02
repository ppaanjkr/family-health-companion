import { getPersonProfiles } from "@/services/profile/profile.service";
import {
  getDailyRecordsByProfile,
} from "@/services/daily/daily.service";

import { getRecordDate } from "@/lib/utils/date";

export async function getDashboardHealthMembers() {
  return await getPersonProfiles();
}

export async function getTodayHealth(
  profileId: string,
) {
  const today = getRecordDate(new Date());

  const records =
    await getDailyRecordsByProfile(
      profileId,
    );

  return (
    records.find(
      (x) =>
        x.recordDate === today,
    ) ?? null
  );
}

export async function getHealthHistory(
  profileId: string,
  limit = 7,
) {
  const records =
    await getDailyRecordsByProfile(
      profileId,
    );

  return records
    .sort((a, b) =>
      a.recordDate <
      b.recordDate
        ? 1
        : -1,
    )
    .slice(0, limit)
    .reverse();
}