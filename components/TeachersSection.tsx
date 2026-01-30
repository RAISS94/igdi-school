"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function TeachersSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    sub: isAr ? "نخبة من العلماء" : "Distinguished Scholars",
    title: isAr ? "حراس العلم" : "Guardians of Knowledge",
    more: isAr ? "تعرف على الجميع" : "Meet All Scholars",
    readBio: isAr ? "اقرأ السيرة" : "Read Biography",
  };

  const teachers = [
    {
      id: 1,
      name_ar: "الشيخ محمد",
      name_en: "Sheikh Mohammed",
      role_ar: "شيخ المدرسة",
      role_en: "Head Master",
      image: "/teacher1.jpg",
    },
    {
      id: 2,
      name_ar: "الشيخ أحمد",
      name_en: "Sheikh Ahmed",
      role_ar: "أستاذ الفقه",
      role_en: "Fiqh Professor",
      image: "/teacher2.jpg",
    },
    {
      id: 3,
      name_ar: "الشيخ علي",
      name_en: "Sheikh Ali",
      role_ar: "أستاذ النحو",
      role_en: "Grammar Professor",
      image: "/teacher3.jpg",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-center md:text-start mx-auto md:mx-0">
            <span className="text-school-gold font-bold tracking-[0.2em] text-xs uppercase block mb-3">
              {t.sub}
            </span>
            <h2 className="text-4xl md:text-5xl font-amiri text-school-dark">
              {t.title}
            </h2>
            <div className="w-1.5 h-1.5 bg-school-gold rotate-45 mt-4 md:mr-auto" />
          </div>

          <Link
            href="/scholars"
            className="hidden md:flex items-center gap-2 text-school-dark hover:text-school-gold transition-colors font-bold text-sm uppercase tracking-wider"
          >
            {t.more}
            {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
          {teachers.map((scholar) => (
            <div
              key={scholar.id}
              className="group flex flex-col items-center text-center w-full max-w-[280px]"
            >
              {/* Arch Frame */}
              <div className="relative w-[260px] mx-auto">
                <div className="absolute inset-0 border border-school-gold/40 rounded-t-full translate-x-2 translate-y-2 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

                <div className="relative w-full aspect-[3/4] rounded-t-full shadow-lg overflow-hidden bg-gray-200 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-school-dark/5" />

                  {scholar.image ? (
                    <Image
                      src={scholar.image}
                      alt={isAr ? scholar.name_ar : scholar.name_en}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-xs font-bold opacity-50">
                        No Image
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none rounded-t-full" />
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-6 h-6 bg-white rotate-45 border border-school-gold shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-school-gold rounded-full" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-8 space-y-1 px-2">
                <h3 className="text-xl font-bold font-amiri text-school-dark group-hover:text-school-gold transition-colors">
                  {isAr ? scholar.name_ar : scholar.name_en}
                </h3>
                <p className="text-xs text-gray-500 font-noto tracking-wider uppercase opacity-80">
                  {isAr ? scholar.role_ar : scholar.role_en}
                </p>

                {/* CHANGED: Always Visible Link */}
                <div className="pt-4">
                  <Link
                    href={`/scholars/${scholar.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-school-gold uppercase tracking-widest hover:text-school-dark transition-colors border-b border-transparent hover:border-school-gold pb-1"
                  >
                    {t.readBio}
                    {isAr ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/scholars"
            className="inline-flex items-center gap-2 text-school-dark font-bold text-sm border-b border-school-gold pb-1"
          >
            {t.more}
          </Link>
        </div>
      </div>
    </section>
  );
}
