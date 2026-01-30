import { PrismaClient } from "@prisma/client";
import CoursesPublicClient from "./CoursesPublicClient";

const prisma = new PrismaClient();

export default async function CoursesPage() {
  // Fetch real courses from SQLite, newest first
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <CoursesPublicClient courses={courses} />;
}
