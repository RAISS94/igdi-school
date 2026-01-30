"use client";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function LibrarySection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    title: isAr ? "المكتبة الرقمية" : "Digital Library",
    subtitle: isAr ? "مصادر المعرفة" : "Knowledge Resources",
    desc: isAr
      ? "مجموعة مختارة من المتون العلمية والكتب المنهجية متاحة للتحميل مجاناً لطلبة العلم."
      : "A curated collection of scientific texts and curriculum books available for free download.",
    viewAll: isAr ? "تصفح المكتبة" : "Browse Library",
  };

  // Slimmer widths and elegant heights
  const shelfBooks = [
    { id: 1, color: "bg-[#064E3B]", h: "h-64", w: "w-10" }, // Forest Green (Tallest)
    { id: 2, color: "bg-[#78350F]", h: "h-56", w: "w-9" }, // Earth Brown
    { id: 3, color: "bg-[#1E3A8A]", h: "h-60", w: "w-11" }, // Royal Blue
    { id: 4, color: "bg-[#8B1A3E]", h: "h-52", w: "w-8" }, // Deep Red
  ];

  return (
    <section
      className="py-20 bg-white font-noto overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 ${isAr ? "lg:flex-row-reverse" : ""}`}
        >
          {/* LEFT: SLIM VERTICAL BOOKSHELF */}
          <div className="flex flex-col items-center">
            <div className="flex items-end border-b-[3px] border-gray-100 gap-1 px-2">
              {shelfBooks.map((book) => (
                <div key={book.id} className={`relative group ${book.w}`}>
                  <div
                    className={`relative w-full ${book.h} ${book.color} rounded-t-[2px] shadow-sm 
                               transition-all duration-500 ease-in-out cursor-pointer
                               group-hover:-translate-y-6 group-hover:shadow-xl group-hover:z-10`}
                  >
                    {/* Subtle Spine Light */}
                    <div className="absolute inset-y-0 left-0 w-[2px] bg-white/10" />

                    {/* Elegant Minimal Icon */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-20 group-hover:opacity-60 transition-opacity">
                      <BookOpen size={14} className="text-white" />
                    </div>

                    {/* Decorative Foil Line */}
                    <div className="absolute top-4 inset-x-0 h-[1px] bg-school-gold/30" />
                  </div>
                </div>
              ))}
            </div>
            {/* Soft Shadow below the shelf */}
            <div className="h-4 w-48 bg-gray-400/5 blur-lg rounded-full mt-1" />
          </div>

          {/* RIGHT: BALANCED CONTENT */}
          <div className="max-w-md text-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-school-gold/50" />
              <span className="text-school-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                {t.subtitle}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-amiri text-gray-900 mb-6 leading-tight">
              {t.title}
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
              {t.desc}
            </p>

            <Link
              href="/library"
              className="inline-flex group px-8 py-3 rounded-full bg-[#0B1120] text-white hover:bg-school-gold hover:text-school-dark transition-all duration-300 items-center gap-3 text-sm font-bold shadow-lg"
            >
              <span>{t.viewAll}</span>
              <ArrowRight
                className={`group-hover:translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`}
                size={16}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
