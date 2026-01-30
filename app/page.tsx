import { PrismaClient } from "@prisma/client";

// FIX: Use "../" to go up out of the 'app' folder to find 'components'
import Hero from "../components/Hero";
import TeachersSection from "../components/TeachersSection";
import CoursesSection from "../components/CoursesSection";
import LibrarySection from "../components/LibrarySection";
import NewsletterDonateSection from "../components/NewsletterDonateSection";

const prisma = new PrismaClient();

export default async function Home() {
  const recentCourses = await prisma.course.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // Fetch 4 Newest Books for the Library Section
  const recentBooks = await prisma.book.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Hero />
      <TeachersSection />

      {/* Pass Real Data */}
      <CoursesSection courses={recentCourses} />

      {/* Pass Real Books */}
      <LibrarySection books={recentBooks} />

      <NewsletterDonateSection />
    </main>
  );
}
