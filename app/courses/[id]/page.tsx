import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import CourseDetailsClient from "./CourseDetailsClient";

const prisma = new PrismaClient();

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Await the params (Required in Next.js 15+)
  const { id } = await params;

  // 2. Fetch the specific course
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) return notFound();

  // 3. Fetch related courses (same category, excluding current one)
  const relatedCourses = await prisma.course.findMany({
    where: {
      category: course.category,
      NOT: { id: course.id },
    },
    take: 4,
  });

  // 4. Pass everything to the Client Component
  // casting 'as any' prevents strict type errors during the build
  return (
    <CourseDetailsClient
      course={course as any}
      related={relatedCourses as any}
    />
  );
}
