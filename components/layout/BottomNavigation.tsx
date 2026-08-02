// components/layout/BottomNavigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";

const navigationItems = [
  { href: ROUTES.DASHBOARD, label: "หน้าหลัก", icon: "home" },
  { href: ROUTES.DAILY, label: "บันทึก", icon: "calendar" },
  { href: ROUTES.EXPENSES, label: "ค่าใช้จ่าย", icon: "expense" },
  { href: ROUTES.PROFILE, label: "โปรไฟล์", icon: "user" },
] as const;

type IconName = (typeof navigationItems)[number]["icon"];

function NavigationIcon({ name }: { name: IconName }) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (name === "home") {
    return (
      <svg {...commonProps}>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" />
        <path d="M9 21v-6h6v6" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...commonProps}>
        <rect height="17" rx="2" width="18" x="3" y="4" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    );
  }

  if (name === "expense") {
    return (
      <svg {...commonProps}>
        <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <path d="M16 12h3" />
        <circle cx="15.5" cy="12" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid w-full max-w-lg grid-cols-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {navigationItems.map((item) => {
          const isActive = isRouteActive(pathname, item.href);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-medium transition ${isActive ? "text-sky-600" : "text-slate-500 hover:text-slate-800"}`}
              href={item.href}
              key={item.href}
            >
              <span className="h-5 w-5">
                <NavigationIcon name={item.icon} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
