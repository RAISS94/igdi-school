import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

// BEST PRACTICE: Use a singleton 'prisma' from your lib folder if you have one.
const prisma = new PrismaClient();

export default async function DashboardPage() {
  // 🛡️ DOUBLE PROTECTION: Check the session on the server
  // If the cookie isn't present, kick them back to login instantly
  const session = await getServerSession();

  if (!session) {
    redirect("/qiyada/login");
  }

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
