"use client";
import { useState } from "react";
import Link from "next/link";
import { Play, Clock, User, ArrowRight, Search, Filter } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// ... (Helper function getYouTubeId same as before) ...
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function CoursesPublicClient({ courses }: { courses: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [activeCategory, setActiveCategory] = useState("All");

  const t = {
    title: isAr ? "المكتبة المرئية" : "Video Library",
    subtitle: isAr
      ? "دروس ومحاضرات علمية مؤصلة"
      : "Authentic Scientific Lectures & Courses",
    all: isAr ? "الكل" : "All",
    cat_fiqh: isAr ? "الفقه" : "Fiqh",
    cat_grammar: isAr ? "النحو" : "Grammar",
    cat_hadith: isAr ? "الحديث" : "Hadith",
    cat_quran: isAr ? "القرآن" : "Quran",
  };

  const categories = [
    { id: "All", label: t.all },
    { id: "Fiqh", label: t.cat_fiqh },
    { id: "Grammar", label: t.cat_grammar },
    { id: "Hadith", label: t.cat_hadith },
    { id: "Quran", label: t.cat_quran },
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <div
      className={`min-h-screen bg-[#0B1120] text-white pt-32 pb-24 font-noto ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-school-gold/10 border border-school-gold/20 text-school-gold text-sm font-bold uppercase tracking-widest mb-6">
            <Play size={14} fill="currentColor" /> {t.title}
          </div>
          <h1 className="text-4xl md:text-6xl font-amiri text-white mb-6 leading-tight">
            {t.subtitle}
          </h1>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full border transition-all duration-300 font-bold text-sm ${
                activeCategory === cat.id
                  ? "bg-school-gold border-school-gold text-school-dark shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-105"
                  : "bg-[#1A202C] border-white/10 text-gray-400 hover:border-school-gold/50 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const videoId = getYouTubeId(course.videoUrl);
            return (
              <Link
                href={`/courses/${course.id}`}
                key={course.id}
                className="group block bg-[#1A202C] border border-white/10 rounded-[2rem] overflow-hidden hover:border-school-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={course.title_en}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C] via-transparent to-transparent opacity-90" />

                  <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-school-gold/90 rounded-full flex items-center justify-center text-school-dark opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-xl">
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-8 relative">
                  <div className="flex items-center gap-2 text-xs text-school-gold font-mono mb-3 uppercase tracking-wider">
                    <Clock size={12} />
                    <span>{course.duration}</span>
                  </div>

                  <h3 className="text-xl font-amiri font-bold text-white mb-6 line-clamp-2 leading-relaxed group-hover:text-school-gold transition-colors min-h-[3.5rem]">
                    {isAr ? course.title_ar : course.title_en}
                  </h3>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-white transition-colors">
                      <User size={14} className="text-school-gold" />
                      <span>{isAr ? course.sheikh_ar : course.sheikh_en}</span>
                    </div>
                    <ArrowRight
                      size={16}
                      className={`text-gray-600 group-hover:text-school-gold transition-colors ${isAr ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
