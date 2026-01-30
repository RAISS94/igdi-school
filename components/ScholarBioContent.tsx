"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Define the Interface for TypeScript safety
interface Scholar {
  id: number;
  image: string;
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  specialty_ar: string;
  specialty_en: string;
  bio_ar: string;
  bio_en: string;
  full_bio_ar?: string; // Optional HTML string
  full_bio_en?: string; // Optional HTML string
}

export default function ScholarBioContent({ scholar }: { scholar: Scholar }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    back: isAr ? "عودة للهيئة التعليمية" : "Back to Faculty",
    specialty: isAr ? "التخصص:" : "Specialty:",
    biography: isAr ? "السيرة الذاتية" : "Biography",
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-noto">
      {/* 1. HERO SECTION (Dark Top) */}
      <div className="relative bg-[#0B1120] pt-32 pb-24 lg:pb-32 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Image (Left/Right based on Lang) */}
          <div
            className={`w-full max-w-sm md:w-1/3 relative shrink-0 ${isAr ? "md:order-last" : ""}`}
          >
            <div className="aspect-[3/4] relative rounded-t-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <Image
                src={scholar.image}
                alt={isAr ? scholar.name_ar : scholar.name_en}
                fill
                className="object-cover"
                priority
              />
              {/* Inner Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-40" />
            </div>
            {/* Decorative Border behind */}
            <div className="absolute inset-0 border border-school-gold/30 rounded-t-full translate-x-4 translate-y-4 -z-10" />
          </div>

          {/* Text Info */}
          <div
            className={`flex-1 text-center ${isAr ? "md:text-right" : "md:text-left"}`}
          >
            <Link
              href="/scholars"
              className="inline-flex items-center gap-2 text-school-gold/80 hover:text-school-gold text-xs uppercase tracking-widest font-bold mb-6 transition-colors"
            >
              {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              {t.back}
            </Link>

            <h1 className="text-4xl md:text-6xl font-amiri text-white mb-4 leading-tight">
              {isAr ? scholar.name_ar : scholar.name_en}
            </h1>

            <p className="text-xl text-school-gold font-amiri mb-8 opacity-90">
              {isAr ? scholar.role_ar : scholar.role_en}
            </p>

            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full">
              <BookOpen size={18} className="text-school-gold" />
              <span className="text-gray-300 text-sm">
                <span className="font-bold text-white mr-2">{t.specialty}</span>
                {isAr ? scholar.specialty_ar : scholar.specialty_en}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTENT SECTION (White Bottom) */}
      <div className="max-w-4xl mx-auto px-6 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <Quote size={24} className="text-school-gold rotate-180" />
            <h2 className="text-2xl font-bold text-school-dark font-amiri">
              {t.biography}
            </h2>
          </div>

          {/* Render HTML Content safely */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-amiri prose-headings:text-school-dark prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-school-dark"
            dangerouslySetInnerHTML={{
              __html: isAr
                ? scholar.full_bio_ar || `<p>${scholar.bio_ar}</p>`
                : scholar.full_bio_en || `<p>${scholar.bio_en}</p>`,
            }}
          />

          {/* Signature / End Mark */}
          <div className="mt-12 flex justify-center opacity-30">
            <div className="w-16 h-px bg-school-dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
