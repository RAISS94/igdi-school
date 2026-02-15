"use client";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function LibrarySection({ books }: { books?: any[] }) {
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

  // 7 slim books with randomized heights to fill the shelf area
  const shelfBooks = [
    { id: 1, color: "bg-[#B8860B]", height: "180px", width: "w-8 md:w-10" },
    { id: 2, color: "bg-[#4A5568]", height: "140px", width: "w-6 md:w-8" },
    { id: 3, color: "bg-[#2D3748]", height: "160px", width: "w-7 md:w-9" },
    { id: 4, color: "bg-[#8B1A3E]", height: "120px", width: "w-5 md:w-7" },
    { id: 5, color: "bg-[#1E3A8A]", height: "170px", width: "w-8 md:w-10" },
    { id: 6, color: "bg-[#78350F]", height: "150px", width: "w-7 md:w-9" },
    { id: 7, color: "bg-[#064E3B]", height: "190px", width: "w-9 md:w-11" },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-white font-noto overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Mobile: flex-col (Text first, then Books)
            Desktop: lg:flex-row-reverse (Books Left, Text Right) 
        */}
        <div
          className={`flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24`}
        >
          {/* CONTENT SECTION (Comes first on mobile) */}
          <div className="flex-1 max-w-md text-center lg:text-start">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <span className="w-8 h-[1px] bg-school-gold/50" />
              <span className="text-school-gold font-bold uppercase tracking-[0.2em] text-[10px]">
                {t.subtitle}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-amiri text-gray-900 mb-6 leading-tight">
              {t.title}
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
              {t.desc}
            </p>

            <Link
              href="/library"
              className="inline-flex group px-10 py-4 rounded-full bg-[#0B1120] text-white hover:bg-school-gold hover:text-school-dark transition-all duration-300 items-center gap-3 text-sm font-bold shadow-xl"
            >
              <span>{t.viewAll}</span>
              <ArrowRight
                className={`group-hover:translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`}
                size={18}
              />
            </Link>
          </div>

          {/* BOOKSHELF AREA (Comes under text on mobile) */}
          <div className="flex-1 flex flex-col items-center min-h-[250px] md:min-h-[300px] justify-end w-full">
            <div className="flex items-end border-b-[4px] border-gray-100 gap-1 md:gap-1.5 px-4 pb-0">
              {shelfBooks.map((book) => (
                <div key={book.id} className={`relative group ${book.width}`}>
                  <div
                    style={{ height: book.height }}
                    className={`relative w-full ${book.color} rounded-t-[2px] shadow-md 
                               transition-all duration-500 ease-in-out cursor-pointer
                               group-hover:-translate-y-8 group-hover:shadow-2xl group-hover:z-10`}
                  >
                    {/* Spine Light Reflection */}
                    <div className="absolute inset-y-0 left-0 w-[1px] md:w-[2px] bg-white/10" />

                    {/* Minimal Book Icon */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-20 group-hover:opacity-80 transition-opacity">
                      <BookOpen className="w-2 md:w-4" />
                    </div>

                    {/* Gold Foil Top Detail */}
                    <div className="absolute top-3 md:top-4 inset-x-0 h-[1px] md:h-[1.5px] bg-school-gold/40" />
                  </div>
                </div>
              ))}
            </div>
            {/* Shelf Shadow Base */}
            <div className="h-6 w-48 md:w-64 bg-gray-400/10 blur-xl rounded-full mt-2 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
