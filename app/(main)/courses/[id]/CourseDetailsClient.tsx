"use client";
import Link from "next/link";
import { Clock, User, ArrowRight, Calendar, Share2, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Define the Types
type Course = {
  id: string;
  title_ar: string;
  title_en: string;
  sheikh_ar: string;
  sheikh_en: string;
  category: string;
  duration: string;
  date: string;
  videoUrl: string;
};

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function CourseDetailsClient({
  course,
  related,
}: {
  course: Course;
  related: Course[];
}) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const videoId = getYouTubeId(course.videoUrl || "");

  const t = {
    back: isAr ? "العودة للدروس" : "Back to Courses",
    related: isAr ? "دروس ذات صلة" : "Related Lessons",
    no_related: isAr
      ? "لا توجد دروس مشابهة حالياً"
      : "No related lessons found.",
    teacher: isAr ? "الشيخ / الأستاذ" : "Teacher / Sheikh",
    share: isAr ? "مشاركة" : "Share",
  };

  return (
    <div
      className={`min-h-screen bg-[#0B1120] text-white pt-32 pb-24 font-noto ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Back Link */}
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-school-gold transition-colors font-bold"
          >
            <ArrowRight size={18} className={isAr ? "rotate-180" : ""} />{" "}
            {t.back}
          </Link>

          {/* Main Video Player */}
          <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative group">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={course.title_en}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Invalid Video URL
              </div>
            )}
          </div>

          {/* Title & Info */}
          <div>
            <div className="flex flex-wrap gap-4 items-center mb-6 text-sm">
              <span className="px-4 py-1.5 rounded-full bg-school-gold text-school-dark font-bold shadow-lg shadow-school-gold/20">
                {course.category}
              </span>
              <span className="flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Clock size={14} className="text-school-gold" />{" "}
                {course.duration}
              </span>
              <span className="flex items-center gap-2 text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Calendar size={14} className="text-school-gold" />{" "}
                {course.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-amiri font-bold mb-4 text-white leading-relaxed">
              {isAr ? course.title_ar : course.title_en}
            </h1>

            {/* Show the secondary language title in small text */}
            <p className="text-lg text-gray-500 font-noto mb-8">
              {isAr ? course.title_en : course.title_ar}
            </p>

            <div className="flex items-center gap-5 p-6 bg-[#1A202C] rounded-2xl border border-white/10 hover:border-school-gold/30 transition-colors">
              <div className="w-14 h-14 bg-school-gold/10 rounded-full flex items-center justify-center text-school-gold border border-school-gold/20">
                <User size={28} />
              </div>
              <div>
                <p className="text-xs text-school-gold uppercase tracking-widest font-bold mb-1">
                  {t.teacher}
                </p>
                <p className="text-xl font-bold text-white">
                  {isAr ? course.sheikh_ar : course.sheikh_en}
                </p>
              </div>
              <button className="mr-auto rtl:ml-auto rtl:mr-0 p-3 rounded-full bg-white/5 hover:bg-school-gold hover:text-school-dark transition-all text-gray-400">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR: Related Lessons */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <Play className="text-school-gold" size={20} />
            <h3 className="text-xl font-bold font-amiri text-white">
              {t.related}
            </h3>
          </div>

          {related.length === 0 && (
            <p className="text-gray-500 text-sm italic">{t.no_related}</p>
          )}

          {related.map((rel) => (
            <Link
              key={rel.id}
              href={`/courses/${rel.id}`}
              className="group block bg-[#1A202C] border border-white/5 rounded-2xl overflow-hidden hover:border-school-gold/50 transition-all hover:shadow-lg"
            >
              <div className="grid grid-cols-3 gap-0">
                {/* Tiny Thumbnail */}
                <div className="relative h-24 bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeId(rel.videoUrl || "")}/mqdefault.jpg`}
                    alt=""
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={12} fill="white" className="text-white" />
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="col-span-2 p-4 flex flex-col justify-center">
                  <span className="text-[10px] text-school-gold font-bold uppercase mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-gray-200 group-hover:text-white line-clamp-2 leading-snug mb-2 font-amiri">
                    {isAr ? rel.title_ar : rel.title_en}
                  </h4>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={10} /> {rel.duration}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
