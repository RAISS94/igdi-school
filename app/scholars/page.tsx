"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { scholarsItems } from "../../data/scholarsData";
import { useLanguage } from "../../context/LanguageContext";

export default function ScholarsPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    headerSub: isAr ? "الهيئة التعليمية" : "The Faculty",
    title: isAr ? "حراس العلم" : "Guardians of Knowledge",
    readBio: isAr ? "سيرة الشيخ" : "Read Biography",
  };

  return (
    // CHANGED: Dark Background + Pattern for Premium Feel
    <div className="min-h-screen bg-[#0B1120] pt-32 pb-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-school-gold/30 bg-school-gold/5 mb-6">
            <span className="text-school-gold tracking-[0.2em] uppercase text-xs font-bold">
              {t.headerSub}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-amiri text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#B8860B] mb-6 drop-shadow-md">
            {t.title}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-school-gold to-transparent mx-auto opacity-50" />
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
          {scholarsItems.map((scholar) => (
            <div
              key={scholar.id}
              className="group flex flex-col items-center text-center w-full max-w-[280px]"
            >
              {/* Arch Frame */}
              <div className="relative w-[260px] mx-auto">
                {/* Gold Outline (Animated) */}
                <div className="absolute inset-0 border border-school-gold/30 rounded-t-full translate-x-2 translate-y-2 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] rounded-t-full shadow-2xl overflow-hidden bg-[#1A202C] z-10 transition-transform duration-500 group-hover:-translate-y-2 border border-white/5">
                  <Image
                    src={scholar.image}
                    alt={isAr ? scholar.name_ar : scholar.name_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Inner Shadow + Vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none rounded-t-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Diamond Decoration */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-6 h-6 bg-[#0B1120] rotate-45 border border-school-gold shadow-lg flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-school-gold rounded-full" />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="mt-8 space-y-2 px-2">
                <h2 className="text-2xl font-bold font-amiri text-white group-hover:text-school-gold transition-colors">
                  {isAr ? scholar.name_ar : scholar.name_en}
                </h2>
                <p className="text-xs text-school-gold/80 font-noto tracking-wider uppercase">
                  {isAr ? scholar.role_ar : scholar.role_en}
                </p>

                <div className="pt-4">
                  <Link
                    href={`/scholars/${scholar.id}`}
                    className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-school-gold pb-1"
                  >
                    {t.readBio}
                    {isAr ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
