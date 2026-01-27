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
    <div className="min-h-screen bg-[#FCFCFC] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-school-gold tracking-[0.2em] uppercase text-xs font-bold block mb-3">
            {t.headerSub}
          </span>
          <h1 className="text-4xl md:text-6xl font-amiri text-school-dark mb-6">
            {t.title}
          </h1>
          <div className="w-1.5 h-1.5 bg-school-gold rotate-45 mx-auto" />
        </div>

        {/* The Grid - Matching Homepage Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
          {scholarsItems.map((scholar) => (
            <div
              key={scholar.id}
              className="group flex flex-col items-center text-center w-full max-w-[280px]"
            >
              {/* Arch Frame */}
              <div className="relative w-[260px] mx-auto">
                {/* Gold Outline */}
                <div className="absolute inset-0 border border-school-gold/40 rounded-t-full translate-x-2 translate-y-2 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] rounded-t-full shadow-lg overflow-hidden bg-white z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  <Image
                    src={scholar.image}
                    alt={isAr ? scholar.name_ar : scholar.name_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none rounded-t-full" />
                </div>

                {/* Diamond Decoration */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-6 h-6 bg-white rotate-45 border border-school-gold shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-school-gold rounded-full" />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="mt-6 space-y-1 px-2">
                <h2 className="text-xl font-bold font-amiri text-school-dark group-hover:text-school-gold transition-colors">
                  {isAr ? scholar.name_ar : scholar.name_en}
                </h2>
                <p className="text-xs text-gray-500 font-noto tracking-wider uppercase opacity-80">
                  {isAr ? scholar.role_ar : scholar.role_en}
                </p>

                <div className="pt-3">
                  <Link
                    href={`/scholars/${scholar.id}`}
                    className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold hover:text-school-gold transition-colors"
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
