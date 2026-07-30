import { Card } from "@/components/ui";

interface LoadingPageProps {
  message?: string;
}

export default function LoadingPage({
  message = "กำลังโหลดข้อมูล...",
}: LoadingPageProps) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
      <Card className="flex flex-col items-center justify-center p-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />

        <p className="mt-4 text-sm text-slate-500">{message}</p>
      </Card>
    </div>
  );
}
