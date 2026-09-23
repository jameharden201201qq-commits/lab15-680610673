import { useState } from "react";
import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

type RegisterDialogProps = {
  availableCourses: Course[];
  currentStudent?: Student;
  onEnroll: (courseId: string, enrolledAtTime: string) => void;
};

export function RegisterDialog({
  availableCourses,
  currentStudent,
  onEnroll,
}: RegisterDialogProps) {
  const get24HourTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [time, setTime] = useState<string>(get24HourTime());

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTime(get24HourTime());
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCourseId) return;

    const now = new Date();
    const [hours, minutes] = (time || get24HourTime()).split(":");
    now.setHours(Number(hours) || 0, Number(minutes) || 0, 0, 0);

    onEnroll(selectedCourseId, now.toISOString());
    setSelectedCourseId("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          type="button"
          className="flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          <UserPlus className="h-4 w-4" />
          <span>ลงทะเบียน</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden gap-0 sm:max-w-[420px]">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <DialogHeader className="space-y-1 text-left">
              <DialogTitle className="text-base font-semibold">
                ลงทะเบียนเรียน
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1.5 pt-2">
              <Label htmlFor="courseSelect" className="text-xs font-medium">
                วิชา
              </Label>
              <Select
                value={selectedCourseId}
                onValueChange={(val) => {
                  if (val) setSelectedCourseId(String(val));
                }}
              >
                <SelectTrigger id="courseSelect" className="w-full">
                  <SelectValue placeholder="เลือกวิชา" />
                </SelectTrigger>
                <SelectContent>
                  {availableCourses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      {course.courseId} - {course.courseTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="timeInput" className="text-xs font-medium">
                เวลา
              </Label>
              <Input
                id="timeInput"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="studentName" className="text-xs font-medium">
                ชื่อ นศ.
              </Label>
              <Input
                id="studentName"
                value={
                  currentStudent
                    ? `${currentStudent.firstName} ${currentStudent.lastName}`
                    : ""
                }
                readOnly
                className="bg-transparent"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="studentProgram" className="text-xs font-medium">
                โปรแกรม
              </Label>
              <Input
                id="studentProgram"
                value={currentStudent?.program || ""}
                readOnly
                className="bg-transparent"
              />
            </div>
          </div>

          <div className="border-t px-6 py-4 flex justify-end">
            <Button
              type="submit"
              disabled={!selectedCourseId}
              className="bg-zinc-700 text-white hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 disabled:opacity-50"
            >
              ยืนยันการลงทะเบียน
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}