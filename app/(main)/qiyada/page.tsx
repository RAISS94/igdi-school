import { PrismaClient } from "@prisma/client";
import DashboardClient from "./DashboardClient";

// BEST PRACTICE: Use a singleton 'prisma' from your lib folder if you have one.
const prisma = new PrismaClient();

export default async function DashboardPage() {
  // 1. Run all database queries in parallel for speed
  const [studentCount, courseCount, messageCount, recentRegistrations] =
    await Promise.all([
      prisma.registration.count(),
      prisma.course.count(),
      prisma.contactMessage.count(),

      // Get the 5 most recent students
      prisma.registration.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  // Books are now in Sanity. Setting to 0 temporarily to prevent dashboard UI errors.
  const bookCount = 0;

  const counts = {
    students: studentCount,
    books: bookCount,
    courses: courseCount,
    messages: messageCount,
  };

  // 2. Render the client component with real data
  return <DashboardClient counts={counts} recent={recentRegistrations} />;
}
