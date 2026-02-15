import { PrismaClient } from "@prisma/client";
import CoursesPublicClient from "./CoursesPublicClient";

const prisma = new PrismaClient();

export default async function CoursesPage() {
  // 1. Fetch real courses
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Fetch real categories (The fix)
  const categories = await prisma.courseCategory.findMany({
    orderBy: { name: "asc" },
  });

  return <CoursesPublicClient courses={courses} categories={categories} />;
}
