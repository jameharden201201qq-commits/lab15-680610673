import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments as allEnrollments,
  CURRENT_STUDENT_ID,
} from "@/lib/mock-data";

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState(
    allEnrollments.filter((e) => e.studentId === CURRENT_STUDENT_ID)
  );

  const handleEnroll = (courseId: string, enrolledAtTime: string) => {
    setEnrollments((prev) => [
      ...prev,
      {
        studentId: CURRENT_STUDENT_ID,
        courseId,
        enrolledAt: enrolledAtTime,
      },
    ]);
  };

  const handleUnenroll = (courseId: string) => {
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  };

  const unenrolledCourses = courses.filter(
    (course) => !enrollments.some((e) => e.courseId === course.courseId)
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-between space-y-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">รายวิชาทั้งหมด</h1>
            {currentStudent && (
              <p className="text-sm text-muted-foreground">
                {currentStudent.firstName} {currentStudent.lastName} ({currentStudent.studentId})
              </p>
            )}
          </div>
          <RegisterDialog
            availableCourses={unenrolledCourses}
            currentStudent={currentStudent}
            onEnroll={handleEnroll}
          />
        </div>

        <div className="flex flex-col gap-4">
          {courses.map((course) => {
            const enrollment = enrollments.find(
              (e) => e.courseId === course.courseId
            );
            const isEnrolled = !!enrollment;

            return (
              <CourseCard
                key={course.courseId}
                course={course}
                student={currentStudent}
                isEnrolled={isEnrolled}
                enrolledAt={enrollment?.enrolledAt}
                onUnenroll={() => handleUnenroll(course.courseId)}
              />
            );
          })}
        </div>
      </div>

      {currentStudent && (
        <footer className="py-4 text-center text-xs text-muted-foreground">
          จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
        </footer>
      )}
    </div>
  );
}