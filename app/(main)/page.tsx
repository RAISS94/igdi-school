import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";
import TeachersSection from "@/components/TeachersSection";
import CoursesSection from "@/components/CoursesSection";
import LibrarySection from "@/components/LibrarySection";
import NewsletterDonateSection from "@/components/NewsletterDonateSection";
import { getScholars, getBooks } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "مدرسة ايكضي العتيقة | الصفحة الرئيسية",
  description:
    "الموقع الرسمي لمدرسة ايكضي العتيقة - حيث تلتقي أصالة التراث بآفاق المستقبل. اكتشف دروسنا، علمائنا، ومكتبتنا الرقمية.",
};

export default async function Home() {
  // Fetch Courses from Prisma Database (retained ORM domain)
  const recentCourses = await prisma.course.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // Fetch Books & Scholars from Sanity CMS
  const allBooks = await getBooks();
  const recentBooks = allBooks.slice(0, 4);

  const allScholars = await getScholars();
  const recentScholars = allScholars.slice(0, 3);

  return (
    <main>
      <Hero />

      {/* Sanity Scholars Data */}
      <TeachersSection teachers={recentScholars} />

      {/* Prisma Courses Data */}
      <CoursesSection courses={recentCourses} />

      {/* Sanity Books Data */}
      <LibrarySection books={recentBooks} />

      <NewsletterDonateSection />
    </main>
  );
}
