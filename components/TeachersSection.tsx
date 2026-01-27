"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { scholarsItems } from "../data/scholarsData";

export default function TeachersSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    title: isAr ? "الهيئة التعليمية" : "The Faculty",
    subtitle: isAr ? "شيوخنا الكرام" : "Our Esteemed Scholars",
    readBio: isAr ? "سيرة الشيخ" : "Read Biography",
    viewAll: isAr ? "التعرف على جميع الشيوخ" : "Meet All Scholars",
    readBioLabel: (name: string) =>
      isAr ? `اقرأ السيرة الذاتية للشيخ ${name}` : `Read biography of ${name}`,
  };

  return (
    // REDUCED PADDING: py-16
    <section className="py-16 bg-[#FCFCFC] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/pattern.png')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-school-gold tracking-widest uppercase text-xs font-bold block mb-2">
            {t.title}
          </span>
          <h2 className="text-3xl md:text-5xl font-amiri text-school-dark leading-tight">
            {t.subtitle}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 opacity-30">
            <div className="w-8 h-[1px] bg-school-gold" />
            <div className="w-1.5 h-1.5 bg-school-gold rotate-45" />
            <div className="w-8 h-[1px] bg-school-gold" />
          </div>
        </div>

        {/* GRID */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 mb-12">
          {scholarsItems.slice(0, 3).map((scholar) => (
            <div
              key={scholar.id}
              className="group flex flex-col items-center text-center w-full md:w-auto"
            >
              <div className="relative w-[240px] mx-auto">
                <div className="absolute inset-0 border border-school-gold/40 rounded-t-full translate-x-1.5 translate-y-1.5 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                <div className="relative w-full aspect-[3/4] rounded-t-full shadow-md overflow-hidden bg-white z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  <Image
                    src={scholar.image}
                    alt={isAr ? scholar.name_ar : scholar.name_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] pointer-events-none rounded-t-full" />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-5 h-5 bg-white rotate-45 border border-school-gold shadow-sm flex items-center justify-center">
                    <div className="w-1 h-1 bg-school-gold rounded-full" />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-1 px-1">
                <h3 className="text-xl font-bold font-amiri text-school-dark group-hover:text-school-gold transition-colors">
                  {isAr ? scholar.name_ar : scholar.name_en}
                </h3>
                <p className="text-[10px] text-gray-500 font-noto tracking-wider uppercase opacity-80">
                  {isAr ? scholar.role_ar : scholar.role_en}
                </p>
                <div className="pt-2 opacity-0 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Link
                    href={`/scholars/${scholar.id}`}
                    title={t.readBioLabel(
                      isAr ? scholar.name_ar : scholar.name_en,
                    )}
                    className="inline-flex items-center gap-1 text-school-gold text-[10px] font-bold hover:underline"
                  >
                    {t.readBio}
                    {isAr ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center">
          <Link
            href="/scholars"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-school-gold/30 text-school-dark text-xs font-bold rounded-full hover:bg-school-gold hover:border-school-gold hover:text-white transition-all shadow-sm hover:shadow-md uppercase tracking-wider"
          >
            {t.viewAll}
            {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </Link>
        </div>
      </div>
    </section>
  );
}
