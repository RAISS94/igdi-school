"use client";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function NewsSection({ news = [] }: { news?: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    title: isAr ? "أخبار وإعلانات" : "News & Announcements",
    subtitle: isAr ? "مستجدات المدرسة العتيقة" : "Latest Updates",
    viewAll: isAr ? "عرض كل الأخبار" : "View All News",
    readMore: isAr ? "اقرأ المزيد" : "Read More",
    empty: isAr ? "لا توجد أخبار حالياً." : "No news available at the moment.",
  };

  // Only take the 3 most recent posts for the homepage snippet
  const displayNews = news.slice(0, 3);

  return (
    <section
      className="py-24 bg-[#0B1120] relative font-noto"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* TOP YELLOW SEPARATOR */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-center -translate-y-1/2 opacity-100 z-20">
        <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-r from-transparent via-school-gold/80 to-school-gold rounded-full"></div>
        <div className="mx-6 relative flex items-center justify-center">
          <div className="w-4 h-4 rotate-45 border-[3px] border-school-gold bg-[#0B1120]"></div>
          <div className="absolute w-2 h-2 rotate-45 bg-school-gold"></div>
        </div>
        <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-l from-transparent via-school-gold/80 to-school-gold rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-school-gold font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-school-gold"></span> {t.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-amiri text-white leading-tight font-bold">
              {t.title}
            </h2>
          </div>
          <Link
            href="/blog"
            className="px-6 py-2.5 rounded-full border border-white/20 text-white hover:bg-school-gold hover:text-school-dark hover:border-school-gold transition-all flex items-center gap-2 group font-bold text-sm shadow-sm"
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
          {displayNews.length === 0 ? (
            <div className="col-span-3 text-center py-16 bg-[#1A202C]/50 rounded-3xl border border-white/10 border-dashed">
              <p className="text-gray-400 font-amiri text-xl">{t.empty}</p>
            </div>
          ) : (
            displayNews.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug || item.id}`}
                className="group bg-[#1A202C] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-school-gold/10 transition-all duration-300 border border-white/5 flex flex-col hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={isAr ? item.title_ar : item.title_en}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {item.createdAt && (
                    <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2">
                      <Calendar size={12} className="text-school-gold" />
                      <span className="text-xs font-bold text-white font-mono">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-amiri font-bold text-white mb-4 line-clamp-2 leading-relaxed group-hover:text-school-gold transition-colors">
                    {isAr ? item.title_ar : item.title_en}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-loose flex-1">
                    {isAr ? item.content_ar : item.content_en}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-school-gold font-bold text-sm">
                    <span>{t.readMore}</span>
                    <div className="w-8 h-8 rounded-full bg-school-gold/10 flex items-center justify-center group-hover:bg-school-gold group-hover:text-school-dark transition-colors">
                      <ChevronRight
                        size={16}
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

      {/* BOTTOM YELLOW SEPARATOR */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center translate-y-1/2 opacity-100 z-20">
        <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-r from-transparent via-school-gold/80 to-school-gold rounded-full"></div>
        <div className="mx-6 relative flex items-center justify-center">
          <div className="w-4 h-4 rotate-45 border-[3px] border-school-gold bg-[#0B1120]"></div>
          <div className="absolute w-2 h-2 rotate-45 bg-school-gold"></div>
        </div>
        <div className="w-1/3 max-w-[250px] h-[2px] bg-gradient-to-l from-transparent via-school-gold/80 to-school-gold rounded-full"></div>
      </div>
    </section>
  );
}
