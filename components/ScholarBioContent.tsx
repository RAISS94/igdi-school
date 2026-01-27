"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Quote, Award, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Define the shape of the scholar object
type Scholar = {
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
};

export default function ScholarBioContent({ scholar }: { scholar: Scholar }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // --- TRANSLATIONS FOR LABELS ---
  const t = {
    specialty: isAr ? "التخصص العلمي" : "Specialty",
    role: isAr ? "المهام والصفة" : "Role & Position",
    biography: isAr ? "السيرة العطرة" : "Biography",
    back: isAr ? "العودة لقائمة الشيوخ" : "Back to Scholars List",
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          {/* 1. SIDEBAR (Portrait & Info) */}
          <div className="w-full md:w-1/3 shrink-0 md:sticky md:top-32">
            {/* Arch Image Frame */}
            <div className="relative w-full aspect-[3/4] rounded-t-full border-4 border-white shadow-2xl overflow-hidden mb-8">
              <Image
                src={scholar.image}
                alt={isAr ? scholar.name_ar : scholar.name_en}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border-[6px] border-school-gold/10 rounded-t-full pointer-events-none" />
            </div>

            {/* Info Box - NOW TRANSLATED */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 text-school-gold mb-2">
                  <Award size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {t.specialty}
                  </span>
                </div>
                <p
                  className={`text-xl text-school-dark ${isAr ? "font-amiri" : "font-noto font-bold"}`}
                >
                  {isAr ? scholar.specialty_ar : scholar.specialty_en}
                </p>
              </div>

              <div className="h-px w-full bg-gray-100" />

              <div>
                <div className="flex items-center gap-2 text-school-gold mb-2">
                  <BookOpen size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {t.role}
                  </span>
                </div>
                <p
                  className={`text-xl text-school-dark ${isAr ? "font-amiri" : "font-noto font-bold"}`}
                >
                  {isAr ? scholar.role_ar : scholar.role_en}
                </p>
              </div>
            </div>
          </div>

          {/* 2. MAIN CONTENT (Biography) */}
          <div className="flex-1">
            <div className="mb-10">
              <span className="text-school-gold font-bold tracking-[0.2em] uppercase text-xs block mb-3">
                {t.biography}
              </span>
              <h1 className="text-4xl md:text-6xl font-amiri text-school-dark mb-4 leading-tight">
                {isAr ? scholar.name_ar : scholar.name_en}
              </h1>
            </div>

            {/* Intro Quote (Switches Language) */}
            <div className="bg-school-gold/5 p-8 md:p-10 rounded-tl-[50px] rounded-br-[50px] border border-school-gold/20 mb-12 relative">
              <Quote
                className={`absolute top-6 text-school-gold/20 ${isAr ? "left-6 -scale-x-100" : "left-6"}`}
                size={48}
              />
              <p
                className={`italic text-gray-700 text-2xl leading-relaxed text-center relative z-10 ${isAr ? "font-amiri" : "font-noto"}`}
              >
                "{isAr ? scholar.bio_ar : scholar.bio_en}"
              </p>
            </div>

            {/* Rich Text Content (Switches Language Completely) */}
            <div
              className={`prose prose-lg max-w-none text-gray-600 leading-loose ${isAr ? "prose-headings:font-amiri" : "prose-headings:font-sans"}`}
            >
              {/* Only render the language that is active */}
              <div
                dangerouslySetInnerHTML={{
                  __html: isAr
                    ? scholar.full_bio_ar || ""
                    : scholar.full_bio_en || "",
                }}
              />
            </div>

            {/* Back Link */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <Link
                href="/scholars"
                className="inline-flex items-center gap-3 text-school-dark font-bold hover:text-school-gold transition-colors group"
              >
                {/* Logic to flip arrow based on language/direction */}
                <ArrowRight className="ltr:hidden group-hover:-translate-x-1 transition-transform" />
                <ArrowLeft className="rtl:hidden group-hover:translate-x-1 transition-transform" />
                <span>{t.back}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
