import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { currentStudent } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-between">
      <div className="flex flex-1 flex-col items-center justify-start pt-12">
        <Card className="w-full max-w-xl border-muted bg-card">
          <CardContent className="flex flex-col items-start gap-4 p-8">
            <h2 className="text-base font-semibold">
              ระบบลงทะเบียนเรียน CPE & ISNE
            </h2>
            <Link
              to="/enrollment"
              className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              ไปหน้าลงทะเบียนเรียน
            </Link>
          </CardContent>
        </Card>

        {currentStudent && (
          <p className="mt-4 text-xs text-muted-foreground">
            จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
          </p>
        )}
      </div>

      {currentStudent && (
        <footer className="py-4 text-center text-xs text-muted-foreground">
          จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
        </footer>
      )}
    </div>
  );
}