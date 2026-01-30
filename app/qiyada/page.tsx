import { PrismaClient } from "@prisma/client";
import DashboardClient from "./DashboardClient";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // 1. Run all database queries in parallel for speed
  const [
    studentCount,
    bookCount,
    courseCount,
    messageCount,
    recentRegistrations,
  ] = await Promise.all([
    prisma.registration.count(),
    prisma.book.count(),
    prisma.course.count(),
    prisma.message.count(),
    // Get the 5 most recent students
    prisma.registration.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const counts = {
    students: studentCount,
    books: bookCount,
    courses: courseCount,
    messages: messageCount,
  };

  // 2. Render the client component with real data
  return <DashboardClient counts={counts} recent={recentRegistrations} />;
}
