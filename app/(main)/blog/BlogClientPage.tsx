"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Tag, Newspaper } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function BlogClientPage({ articles }: { articles: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    headerSub: isAr ? "صحيفة المدرسة" : "The Journal",
    title: isAr ? "أخبار ومستجدات" : "News & Updates",
    subtitle: isAr
      ? "نافذتك على أنشطة وإنجازات مدرسة ايكضي العتيقة"
      : "Your window into the activities and achievements of IGDI School",
    readMore: isAr ? "اقرأ المقال" : "Read Article",
    featured: isAr ? "مقال مميز" : "Featured Story",
    empty: isAr ? "لا توجد مقالات حالياً." : "No articles available yet.",
    newsTag: isAr ? "أخبار" : "News",
  };

  // Split data: First item is "Featured", rest are "Grid"
  const featuredPost = articles[0];
  const gridPosts = articles.slice(1);

  // SAFETY CHECK: Prevents crash from old fake database data
  const isValidImage = (url: string) => {
    return (
      url &&
      typeof url === "string" &&
      (url.startsWith("/") || url.startsWith("http"))
    );
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] pt-32 pb-24 font-noto">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-school-gold tracking-[0.2em] uppercase text-xs font-bold block mb-3">
            {t.headerSub}
          </span>
          <h1 className="text-4xl md:text-6xl font-amiri text-school-dark mb-4">
            {t.title}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            {t.subtitle}
          </p>
          <div className="w-1.5 h-1.5 bg-school-gold rotate-45 mx-auto mt-6" />
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-amiri text-2xl flex flex-col items-center">
            <Newspaper size={48} className="mb-4 opacity-50" />
            {t.empty}
          </div>
        ) : (
          <>
            {/* FEATURED POST */}
            {featuredPost && (
              <div className="mb-20">
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="group relative block w-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                    {/* Image Side */}
                    <div className="relative h-64 lg:h-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {isValidImage(featuredPost.image) ? (
                        <Image
                          src={featuredPost.image}
                          alt={
                            isAr ? featuredPost.title_ar : featuredPost.title_en
                          }
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <Newspaper size={64} className="text-gray-300" />
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>

                    {/* Content Side */}
                    <div className="bg-school-dark text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-school-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="bg-school-gold text-school-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {t.featured}
                          </span>
                          <span className="text-school-sand/60 text-xs flex items-center gap-2">
                            <Calendar size={12} />
                            {/* FIX: Enforcing 'en-GB' forces DD/MM/YYYY on both Server & Client */}
                            {new Date(
                              featuredPost.createdAt,
                            ).toLocaleDateString("en-GB")}
                          </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-amiri leading-tight mb-4 group-hover:text-school-gold transition-colors line-clamp-2">
                          {isAr ? featuredPost.title_ar : featuredPost.title_en}
                        </h2>

                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-noto">
                          {isAr
                            ? featuredPost.content_ar
                            : featuredPost.content_en}
                        </p>

                        <span className="inline-flex items-center gap-2 text-school-gold font-bold text-sm border-b border-school-gold/30 pb-1 group-hover:gap-4 transition-all uppercase tracking-widest">
                          {t.readMore}
                          {isAr ? (
                            <ArrowLeft size={16} />
                          ) : (
                            <ArrowRight size={16} />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* THE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridPosts.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                    {isValidImage(item.image) ? (
                      <Image
                        src={item.image}
                        alt={isAr ? item.title_ar : item.title_en}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <Newspaper size={48} className="text-gray-200" />
                    )}

                    <div className="absolute top-3 right-3">
                      <span className="bg-white/95 backdrop-blur-md text-school-dark text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider flex items-center gap-1">
                        <Tag size={10} className="text-school-gold" />
                        {t.newsTag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-wider">
                      <Calendar size={12} />
                      {/* FIX: Enforcing 'en-GB' forces DD/MM/YYYY on both Server & Client */}
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-amiri text-school-dark mb-3 line-clamp-2 group-hover:text-school-gold transition-colors">
                      {isAr ? item.title_ar : item.title_en}
                    </h3>

                    <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3 font-noto flex-grow">
                      {isAr ? item.content_ar : item.content_en}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <Link
                        href={`/blog/${item.id}`}
                        className="inline-flex items-center gap-2 text-school-dark font-bold text-xs hover:text-school-gold transition-colors uppercase tracking-widest"
                      >
                        {t.readMore}
                        {isAr ? (
                          <ArrowLeft size={12} />
                        ) : (
                          <ArrowRight size={12} />
                        )}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
