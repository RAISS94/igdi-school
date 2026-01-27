"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { newsItems } from "../data/newsData";

export default function NewsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    sectionTitle: isAr ? "أخبار المدرسة" : "Latest News",
    subtitle: isAr
      ? "تابع آخر مستجدات وأنشطة مدرسة ايكضي العتيقة"
      : "Follow the latest updates and activities of IGDI School",
    readMore: isAr ? "اقرأ المزيد" : "Read More",
    viewAll: isAr ? "تصفح جميع الأخبار" : "View All News",
  };

  return (
    // REDUCED PADDING: py-16
    <section className="py-16 bg-gray-50 dark:bg-school-dark/50 transition-colors relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-right w-full md:w-auto">
            <h2 className="text-3xl md:text-5xl font-amiri text-school-blue dark:text-school-gold mb-2">
              {t.sectionTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-noto text-sm md:text-base max-w-xl">
              {t.subtitle}
            </p>
            <div className="w-12 h-1 bg-school-gold mx-auto md:mx-0 mt-4 rounded-full" />
          </div>

          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-3 px-6 py-2 border border-school-gold text-school-gold font-bold rounded-full hover:bg-school-gold hover:text-white transition-all uppercase tracking-wider text-xs"
          >
            {t.viewAll}
            {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newsItems.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-school-dark border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group flex flex-col h-full"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={isAr ? item.title_ar : item.title_en}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/95 dark:bg-school-dark/95 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-school-blue shadow-sm uppercase tracking-wider">
                  {isAr ? item.category_ar : item.category_en}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex items-center gap-2 text-school-gold text-[10px] font-bold mb-2">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-lg font-bold font-amiri mb-2 text-gray-900 dark:text-white leading-snug group-hover:text-school-gold transition-colors line-clamp-2">
                  {isAr ? item.title_ar : item.title_en}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 line-clamp-2 font-noto leading-relaxed flex-grow">
                  {isAr ? item.excerpt_ar : item.excerpt_en}
                </p>
                <Link
                  href={`/blog/${item.id}`}
                  className="inline-flex items-center gap-2 text-school-dark dark:text-white font-bold text-xs hover:text-school-gold transition-colors mt-auto group/link"
                >
                  {t.readMore}
                  <ArrowRight
                    size={14}
                    className={`ltr:hidden group-hover/link:translate-x-1 transition-transform`}
                  />
                  <ArrowLeft
                    size={14}
                    className={`rtl:hidden group-hover/link:-translate-x-1 transition-transform`}
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center md:hidden mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-school-gold text-school-gold font-bold rounded-full text-xs"
          >
            {t.viewAll}
            {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
      </div>
    </section>
  );
}
