import type { Student, Course, Enrollment } from "@/lib/types";

export const students: Student[] = [
  {
    studentId: "680640673",
    firstName: "Natthanan",
    lastName: "Sueamun",
    program: "CPE",
    courses: ["261207", "261497"],
  },
  {
    studentId: "650610002",
    firstName: "Cillian",
    lastName: "Murphy",
    program: "CPE",
    courses: ["261207", "261497"],
  },
  {
    studentId: "650610003",
    firstName: "Emily",
    lastName: "Blunt",
    program: "ISNE",
    courses: ["269101", "261497"],
  },
];

export const courses: Course[] = [
  {
    courseId: "261207",
    courseTitle: "Basic Computer Engineering Lab",
    instructors: ["Dome", "Chanadda"],
  },
  {
    courseId: "261497",
    courseTitle: "Full Stack Development",
    instructors: ["Dome", "Nirand", "Chanadda"],
  },
  {
    courseId: "269101",
    courseTitle: "Introduction to Information Systems and Network Engineering",
    instructors: ["KENNETH COSH"],
  },
];

export const enrollments: Enrollment[] = [
  {
    studentId: "680640673",
    courseId: "261207",
    enrolledAt: "2026-09-13T14:15:00",
  },
  {
    studentId: "680640673",
    courseId: "261497",
    enrolledAt: "2026-09-14T09:30:00",
  },
];

export const CURRENT_STUDENT_ID = "680640673";
export const currentStudent = students.find(
  (s) => s.studentId === CURRENT_STUDENT_ID,
)!;

export const currentUser = {
  nickname: "Natthanan",
  role: "STUDENT" as "STUDENT" | "ADMIN",
  avatar: "/mypic.jpg",
};