import { PrismaClient } from "@prisma/client";
import DashboardClient from "./DashboardClient";

// BEST PRACTICE: Use a singleton 'prisma' from your lib folder if you have one.
// If not, this works but might warn about "too many connections" in dev.
const prisma = new PrismaClient();

export default async function DashboardPage() {
  // 1. Run all database queries in parallel for speed
  const [
    studentCount,
    bookCount,
    courseCount,
    messageCount, // This will now work
    recentRegistrations,
  ] = await Promise.all([
    // Check if 'registration' exists in schema. If not, try 'student'.
    prisma.registration.count(),

    prisma.book.count(),

    // If you don't have a 'Course' model yet, remove this line or it will crash next.
    prisma.course.count(),

    // *** FIX: Changed from 'message' to 'contactMessage' ***
    prisma.contactMessage.count(),

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
