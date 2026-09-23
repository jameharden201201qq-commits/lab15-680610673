import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student?: Student;
  enrolledAt?: string;
  isEnrolled?: boolean;
  onUnenroll?: () => void;
};

function formatThaiDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function CourseCard({
  course,
  student,
  enrolledAt,
  isEnrolled,
  onUnenroll,
}: CourseCardProps) {
  return (
    <Card className="relative">
      <div className="absolute right-6 top-6">
        {isEnrolled ? (
          <Badge
            variant="outline"
            className="border-amber-300 bg-amber-100/80 text-amber-700 dark:border-purple-800 dark:bg-purple-950/80 dark:text-purple-300"
          >
            ลงทะเบียนแล้ว
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-purple-300 bg-purple-100/80 text-purple-700 dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
          >
            เปิดรับ
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>

      {isEnrolled && student && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatThaiDate(enrolledAt)}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onUnenroll}
            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}