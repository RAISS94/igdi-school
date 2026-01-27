"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { libraryItems } from "../data/libraryData";

export default function LibrarySection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    sub: isAr ? "خزانة المدرسة" : "The Library",
    title: isAr ? "المخطوطات والكتب" : "Manuscripts & Books",
    desc: isAr
      ? "تضم الخزانة آلاف المخطوطات والكتب النفيسة المتاحة للباحثين."
      : "The library houses thousands of manuscripts and precious books available to researchers.",
    explore: isAr ? "تصفح المكتبة" : "Explore Library",
  };

  // Display first 5 books
  const shelfBooks = libraryItems.slice(0, 5);

  return (
    <section className="py-16 bg-school-dark relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] pointer-events-none" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-school-gold/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* 1. TEXT SIDE (Restored to Wider Layout) */}
          <div className="text-center lg:text-start lg:w-1/2 space-y-6">
            <div>
              <span className="text-school-gold tracking-widest uppercase text-xs font-bold block mb-2">
                {t.sub}
              </span>
              <h2 className="text-4xl md:text-5xl font-amiri text-white">
                {t.title}
              </h2>
            </div>

            <p className="text-gray-400 font-noto leading-relaxed max-w-lg mx-auto lg:mx-0">
              {t.desc}
            </p>

            <Link
              href="/library"
              className="inline-flex items-center gap-3 px-8 py-3 bg-school-gold text-school-dark font-bold rounded-full hover:bg-white transition-colors"
            >
              {t.explore}
              {isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>

          {/* 2. THE 3D BOOKSHELF */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <div className="relative flex items-end gap-3 perspective-1000 px-4 pb-4">
              {/* The Shelf Base */}
              <div className="absolute bottom-0 w-[110%] -left-[5%] h-5 bg-[#3E2723] rounded-sm shadow-2xl border-t border-[#5D4037]" />

              {shelfBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/library?book=${book.id}`}
                  className="group relative"
                >
                  {/* The Spine */}
                  <div
                    className={`
                      w-12 md:w-16 h-48 md:h-64 rounded-t-[2px] shadow-2xl 
                      bg-gradient-to-r ${book.color}
                      border-l-[1px] border-white/10
                      transform transition-transform duration-300 ease-out
                      group-hover:-translate-y-6 cursor-pointer
                      flex flex-col items-center justify-between py-4
                      relative overflow-hidden z-10
                    `}
                  >
                    {/* Top Accent Lines (Gold) */}
                    <div className="w-full space-y-1 opacity-60 px-1">
                      <div
                        className={`h-[2px] w-full bg-gradient-to-r from-transparent via-${book.accent.replace("border-", "")} to-transparent`}
                      />
                      <div
                        className={`h-[1px] w-full bg-gradient-to-r from-transparent via-${book.accent.replace("border-", "")} to-transparent`}
                      />
                    </div>

                    {/* ROTATED TEXT (Horizontal reading up the spine) */}
                    <div className="flex-1 flex items-center justify-center relative w-full">
                      <span className="absolute whitespace-nowrap -rotate-90 text-white/90 font-amiri font-bold text-sm md:text-base tracking-wider drop-shadow-md">
                        {isAr ? book.title_ar : book.title_en}
                      </span>
                    </div>

                    {/* Icon at bottom */}
                    <div className="text-white/30 group-hover:text-school-gold transition-colors pb-2">
                      <book.icon size={14} />
                    </div>

                    {/* Lighting Effect (Left Edge) */}
                    <div className="absolute left-0.5 top-0 bottom-0 w-[1px] bg-white/10" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
