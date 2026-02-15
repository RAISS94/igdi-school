"use client";
import { Clock, ArrowRight, Play, User } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

type Course = {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  sheikh_ar: string;
  sheikh_en: string;
  category: string;
  duration: string;
  videoUrl: string | null;
};

export default function CoursesSection({ courses }: { courses: Course[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    title: isAr ? "أحدث الدروس والمحاضرات" : "Latest Courses & Lectures",
    subtitle: isAr ? "التعليم عن بعد" : "Online Education",
    viewAll: isAr ? "تصفح كل الدروس" : "View All Courses",
    watch: isAr ? "شاهد الآن" : "Watch Now",
    empty: isAr ? "لا توجد دروس مضافة حديثاً." : "No recent courses available.",
  };

  function getThumbnail(url: string) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : "";
  }

  return (
    <section
      className="py-24 bg-[#0B1120] relative overflow-hidden font-noto"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/5 pb-8">
          <div>
            <span className="text-school-gold font-bold uppercase tracking-widest text-xs mb-3 block flex items-center gap-2">
              <span className="w-8 h-[1px] bg-school-gold"></span> {t.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-amiri text-white leading-tight">
              {t.title}
            </h2>
          </div>
          <Link
            href="/courses"
            className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-school-gold hover:text-school-dark hover:border-school-gold transition-all flex items-center gap-3 group font-bold text-sm"
          >
            <span>{t.viewAll}</span>
            <ArrowRight
              className={`group-hover:translate-x-1 transition-transform ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`}
              size={16}
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-[#1A202C]/50 rounded-3xl border border-white/10 border-dashed">
              <p className="text-gray-400 font-amiri text-xl">{t.empty}</p>
            </div>
          ) : (
            courses.map((course) => (
              <Link
                href={`/courses/${course.id}`}
                key={course.id}
                className="group relative flex flex-col bg-[#161b2a] border border-white/5 rounded-3xl overflow-hidden hover:border-school-gold/30 hover:bg-[#1c2233] transition-all duration-300 hover:-translate-y-1 shadow-2xl"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={getThumbnail(course.videoUrl || "")}
                    alt={course.title_en}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161b2a] to-transparent opacity-90" />

                  {/* Floating Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 bg-school-gold text-school-dark rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                    <span className="px-3 py-1 bg-school-gold text-school-dark text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <User size={12} className="text-school-gold" />{" "}
                      {isAr ? course.sheikh_ar : course.sheikh_en}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Clock size={12} /> {course.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-amiri text-white font-bold leading-relaxed mb-3 group-hover:text-school-gold transition-colors">
                    {isAr ? course.title_ar : course.title_en}
                  </h3>

                  {/* Description (New) */}
                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-6">
                    {isAr ? course.description_ar : course.description_en}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                    <span>{t.watch}</span>
                    <ArrowRight
                      size={14}
                      className={`text-school-gold ${isAr ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
