import { PrismaClient } from "@prisma/client";
import CoursesPublicClient from "./CoursesPublicClient";

const prisma = new PrismaClient();

export const metadata = {
  title: "الدروس والمحاضرات | مدرسة ايكضي العتيقة",
  description: "تصفح قائمة الدروس والمحاضرات العلمية في مدرسة ايكضي العتيقة. محاضرات في العلوم الشرعية واللغة العربية.",
};

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
