import prisma from "@/lib/prisma";
import Hero from "@/components/Hero";
import TeachersSection from "@/components/TeachersSection";
import CoursesSection from "@/components/CoursesSection";
import LibrarySection from "@/components/LibrarySection";
import NewsSection from "@/components/NewsSection";
import NewsletterDonateSection from "@/components/NewsletterDonateSection";
import { getScholars, getBooks, getBlogPosts } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata = {
  title: "مدرسة ايكضي العتيقة | الصفحة الرئيسية",
  description:
    "الموقع الرسمي لمدرسة ايكضي العتيقة - حيث تلتقي أصالة التراث بآفاق المستقبل. اكتشف دروسنا، علمائنا، ومكتبتنا الرقمية.",
};

// This new divider is positioned absolutely at the bottom.
// By using translate-y-1/2, it perfectly overlaps the border between two sections!
const OverlappingDivider = ({ bgColor }: { bgColor: string }) => (
  <div className="absolute bottom-0 inset-x-0 flex items-center justify-center translate-y-1/2 z-30 pointer-events-none">
    <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-r from-transparent via-school-gold/80 to-school-gold rounded-full"></div>
    <div className="mx-6 relative flex items-center justify-center">
      <div
        className={`w-4 h-4 rotate-45 border-[3px] border-school-gold ${bgColor}`}
      ></div>
      <div className="absolute w-2 h-2 rotate-45 bg-school-gold"></div>
    </div>
    <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-l from-transparent via-school-gold/80 to-school-gold rounded-full"></div>
  </div>
);

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

  const allPosts = await getBlogPosts();

  return (
    <main className="bg-white flex flex-col">
      <Hero />

      {/* 1. Sanity News / Blog Data */}
      <div className="relative z-20">
        <NewsSection news={allPosts} />
        {/* Divider seamlessly bridging News (dark) and Courses (dark) */}
        <OverlappingDivider bgColor="bg-[#0B1120]" />
      </div>

      {/* 2. Prisma Courses Data */}
      <CoursesSection courses={recentCourses} />

      {/* 3. Sanity Scholars Data */}
      <div className="relative z-10">
        <TeachersSection teachers={recentScholars} />
        {/* Divider seamlessly bridging Scholars (white) and Library (white) */}
        <OverlappingDivider bgColor="bg-white" />
      </div>

      {/* 4. Sanity Books Data (Library) */}
      <LibrarySection books={recentBooks} />

      {/* 5. Newsletter */}
      <NewsletterDonateSection />
    </main>
  );
}
