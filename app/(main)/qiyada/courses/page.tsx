import { PrismaClient } from "@prisma/client";
import CoursesClient from "./CoursesClient";

const prisma = new PrismaClient();

export default async function CoursesPage() {
  // 1. Fetch Courses
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Fetch Categories (The dynamic filters)
  const categories = await prisma.courseCategory.findMany({
    orderBy: { name: "asc" },
  });

  return <CoursesClient courses={courses} categories={categories} />;
}
