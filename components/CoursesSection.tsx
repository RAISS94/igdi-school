"use client";
import { Clock, ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

type Course = {
  id: string;
  title_ar: string;
  title_en: string;
  category: string;
  duration: string;
  videoUrl: string;
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {" "}
          {/* Reduced gap from 8 to 6 */}
          {courses.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-[#1A202C]/50 rounded-3xl border border-white/10 border-dashed">
              <p className="text-gray-400 font-amiri text-xl">{t.empty}</p>
            </div>
          ) : (
            courses.map((course) => (
              <Link
                href={`/courses/${course.id}`}
                key={course.id}
                // CHANGED: Reduced border radius from 2rem to 1.5rem (3xl)
                className="group relative block bg-[#1A202C] border border-white/10 rounded-3xl overflow-hidden hover:border-school-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                {/* Image Container */}
                {/* CHANGED: Aspect Ratio from [16/10] to video (16/9) for shorter height */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={getThumbnail(course.videoUrl || "")}
                    alt={course.title_en}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C] via-transparent to-transparent opacity-80" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                    <span className="px-3 py-1 bg-school-gold text-school-dark text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                      {course.category}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-2xl">
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                {/* CHANGED: Reduced padding from p-8 to p-6 */}
                <div className="p-6 relative">
                  <div className="flex items-center gap-2 text-xs text-school-gold font-mono mb-2 uppercase tracking-wider">
                    <Clock size={12} />
                    <span>{course.duration}</span>
                  </div>

                  {/* CHANGED: Reduced text size from 2xl to xl */}
                  <h3 className="text-xl font-amiri text-white font-bold leading-relaxed mb-4 group-hover:text-school-gold transition-colors line-clamp-2 min-h-[3.5rem]">
                    {isAr ? course.title_ar : course.title_en}
                  </h3>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-gray-400 text-xs group/btn">
                    <span className="group-hover:text-white transition-colors font-bold uppercase tracking-widest">
                      {t.watch}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-school-gold group-hover:text-school-dark group-hover:border-school-gold transition-all">
                      <ArrowRight
                        size={14}
                        className={isAr ? "rotate-180" : ""}
                      />
                    </div>
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
