"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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
  full_bio_ar?: string;
  full_bio_en?: string;
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
    <div
      className={`min-h-screen bg-[#0B1120] text-white pt-32 pb-24 font-noto relative overflow-hidden ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-school-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <Link
          href="/scholars"
          className="inline-flex items-center gap-2 text-school-gold/80 hover:text-school-gold text-xs uppercase tracking-widest font-bold mb-10 transition-colors"
        >
          {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          {t.back}
        </Link>

        {/* HERO SECTION / HEADER CARD */}
        <div className="bg-[#1A202C]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-48 h-48 bg-school-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            {/* Scholar Portrait */}
            <div className="relative w-44 h-56 md:w-52 md:h-68 rounded-2xl overflow-hidden border-2 border-school-gold/30 shadow-2xl shrink-0 group">
              <Image
                src={scholar.image}
                alt={isAr ? scholar.name_ar : scholar.name_en}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Scholar Metadata */}
            <div
              className={`flex-1 text-center ${isAr ? "md:text-right" : "md:text-left"}`}
            >
              <span className="inline-block px-4 py-1.5 bg-school-gold/10 text-school-gold text-xs font-bold uppercase tracking-wider rounded-lg mb-4 border border-school-gold/20">
                {isAr ? scholar.role_ar : scholar.role_en}
              </span>

              <h1 className="text-3xl md:text-5xl font-amiri text-white mb-4 leading-tight font-bold">
                {isAr ? scholar.name_ar : scholar.name_en}
              </h1>

              <div
                className={`inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full ${isAr ? "flex-row-reverse" : ""}`}
              >
                <BookOpen size={16} className="text-school-gold shrink-0" />
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-school-gold ml-1 mr-1">
                    {t.specialty}
                  </span>
                  {isAr ? scholar.specialty_ar : scholar.specialty_en}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BIOGRAPHY CONTENT CARD */}
        <div className="bg-[#1A202C]/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-14 border border-white/10 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-school-gold/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div
            className={`flex items-center gap-3 mb-8 pb-6 border-b border-white/10 ${isAr ? "flex-row-reverse" : ""}`}
          >
            <Quote size={28} className="text-school-gold rotate-180 shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-school-gold font-amiri">
              {t.biography}
            </h2>
          </div>

          {/* Render HTML Content with rich typography styling */}
          <div
            className={`prose prose-invert max-w-none font-amiri text-lg md:text-xl leading-loose text-gray-200 
              prose-headings:text-school-gold prose-headings:font-amiri prose-headings:font-bold 
              prose-p:mb-6 prose-strong:text-white prose-strong:font-bold
              ${isAr ? "text-right font-amiri" : "text-left"}`}
            dangerouslySetInnerHTML={{
              __html: isAr
                ? scholar.full_bio_ar || `<p>${scholar.bio_ar}</p>`
                : scholar.full_bio_en || `<p>${scholar.bio_en}</p>`,
            }}
          />

          {/* Elegant Divider / End Mark */}
          <div className="mt-14 flex items-center justify-center gap-4 opacity-40">
            <div className="w-12 h-px bg-school-gold" />
            <div className="w-2 h-2 rounded-full bg-school-gold" />
            <div className="w-12 h-px bg-school-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
