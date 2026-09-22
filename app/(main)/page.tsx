import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";
import TeachersSection from "@/components/TeachersSection";
import CoursesSection from "@/components/CoursesSection";
import LibrarySection from "@/components/LibrarySection";
import NewsSection from "@/components/NewsSection";
import NewsletterDonateSection from "@/components/NewsletterDonateSection";
import { getScholars, getBooks, getBlogPosts } from "@/sanity/lib/queries"; // Added getBlogPosts

export const revalidate = 60;

export const metadata = {
  title: "مدرسة ايكضي العتيقة | الصفحة الرئيسية",
  description:
    "الموقع الرسمي لمدرسة ايكضي العتيقة - حيث تلتقي أصالة التراث بآفاق المستقبل. اكتشف دروسنا، علمائنا، ومكتبتنا الرقمية.",
};

export default async function Home() {
  // Fetch Courses from Prisma Database
  const recentCourses = await prisma.course.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // Fetch Books, Scholars, and Blog Posts from Sanity CMS
  const allBooks = await getBooks();
  const recentBooks = allBooks.slice(0, 4);

  const allScholars = await getScholars();
  const recentScholars = allScholars.slice(0, 3);

  const allPosts = await getBlogPosts(); // Fetch exact Sanity blog posts

  return (
    <main className="bg-white">
      <Hero />

      {/* 1. Prisma Courses Data */}
      <CoursesSection courses={recentCourses} />

      {/* 2. Sanity Books Data */}
      <LibrarySection books={recentBooks} />

      {/* BEAUTIFUL YELLOW SEPARATOR BETWEEN LIBRARY AND SCHOLARS */}
      <div className="w-full flex items-center justify-center py-16 bg-white opacity-80">
        <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-r from-transparent via-school-gold/50 to-school-gold rounded-full"></div>
        <div className="mx-6 relative flex items-center justify-center">
          <div className="w-4 h-4 rotate-45 border-[3px] border-school-gold bg-transparent"></div>
          <div className="absolute w-2 h-2 rotate-45 bg-school-gold"></div>
        </div>
        <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-l from-transparent via-school-gold/50 to-school-gold rounded-full"></div>
      </div>

      {/* 3. Sanity Scholars Data */}
      <TeachersSection teachers={recentScholars} />

      {/* 4. Sanity News / Blog Data (Dark Blue with top/bottom separators) */}
      <NewsSection news={allPosts} />

      {/* 5. Newsletter */}
      <NewsletterDonateSection />
    </main>
  );
}
