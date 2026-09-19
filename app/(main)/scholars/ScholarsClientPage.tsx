"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, User, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ScholarsClientPage({ scholars }: { scholars: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [searchQuery, setSearchQuery] = useState("");

  const t = {
    headerSub: isAr ? "الهيئة التعليمية" : "The Faculty",
    title: isAr ? "حراس العلم" : "Guardians of Knowledge",
    readBio: isAr ? "سيرة الشيخ" : "Read Biography",
    empty: isAr ? "لا توجد بيانات حالياً." : "No scholars available yet.",
    search_ph: isAr ? "بحث بالاسم..." : "Search by name...",
    no_results: isAr
      ? "لم يتم العثور على شيخ بهذا الاسم."
      : "No scholar found with this name.",
  };

  const filteredScholars = scholars.filter((scholar) => {
    const q = searchQuery.toLowerCase();
    return (
      scholar.name_ar.includes(searchQuery) ||
      scholar.name_en.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0B1120] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
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

        {scholars.length > 0 && (
          <div className="max-w-md mx-auto mb-16 relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search_ph}
                className={`w-full bg-white/5 border border-white/10 rounded-full py-3 text-white placeholder-gray-500 focus:outline-none focus:border-school-gold focus:bg-white/10 transition-all ${
                  isAr ? "pr-12 pl-6" : "pl-12 pr-6"
                }`}
              />
              <Search
                className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${
                  isAr ? "right-4" : "left-4"
                }`}
                size={20}
              />
            </div>
          </div>
        )}

        {scholars.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-amiri text-xl">
            {t.empty}
          </div>
        ) : filteredScholars.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-amiri text-xl">
            {t.no_results}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
            {filteredScholars.map((scholar) => (
              <div
                key={scholar.id}
                className="group flex flex-col items-center text-center w-full max-w-[280px]"
              >
                <div className="relative w-[260px] mx-auto">
                  <div className="absolute inset-0 border border-school-gold/30 rounded-t-full translate-x-2 translate-y-2 pointer-events-none transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />

                  <div className="relative w-full aspect-[3/4] rounded-t-full shadow-2xl overflow-hidden bg-[#1A202C] z-10 transition-transform duration-500 group-hover:-translate-y-2 border border-white/5 flex items-center justify-center">
                    {scholar.image ? (
                      <Image
                        src={scholar.image}
                        alt={isAr ? scholar.name_ar : scholar.name_en}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <User size={64} className="text-white/10" />
                    )}
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none rounded-t-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-6 h-6 bg-[#0B1120] rotate-45 border border-school-gold shadow-lg flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-school-gold rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2 px-2">
                  <h2 className="text-2xl font-bold font-amiri text-white group-hover:text-school-gold transition-colors">
                    {isAr ? scholar.name_ar : scholar.name_en}
                  </h2>
                  <p className="text-xs text-school-gold/80 font-noto tracking-wider uppercase">
                    {isAr ? scholar.title_ar : scholar.title_en}
                  </p>

                  <div className="pt-4">
                    <Link
                      href={`/scholars/${scholar.id}`}
                      className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-school-gold pb-1"
                    >
                      {t.readBio}
                      {isAr ? (
                        <ArrowLeft size={12} />
                      ) : (
                        <ArrowRight size={12} />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
