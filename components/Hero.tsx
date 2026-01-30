"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    verse: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    welcome:
      language === "ar" ? "مدرسة إيكضي العتيقة" : "Traditional School of IGDI",
    subWelcome:
      language === "ar"
        ? "حيث تلتقي أصالة التراث بآفاق المستقبل"
        : "Where Ancient Heritage Meets the Future",
    cta: language === "ar" ? "اكتشف تاريخنا" : "Discover Our Legacy",
    scroll: language === "ar" ? "اكتشف المزيد" : "Scroll Down",
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B1120]">
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 md:animate-slow-zoom">
        <Image
          src="/igdi-hero.png"
          alt="Ecole Traditionnelle IGDI - Historical Building"
          fill
          // object-center ensures the focus stays in the middle on mobile
          className="object-cover object-center opacity-80"
          priority
        />
      </div>

      {/* 2. CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.07] z-[1] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/20 to-black/60 z-[2]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,#000000_100%)] z-[2]" />

      {/* 3. HERO CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
        {/* The Holy Verse */}
        <div className="relative mb-8 group cursor-default">
          <div className="absolute -inset-4 bg-black/40 blur-xl rounded-full opacity-50" />
          <h2 className="relative font-amiri text-4xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#B8860B] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] leading-tight py-2 select-none">
            "{t.verse}"
          </h2>
        </div>

        {/* Divider */}
        <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-school-gold to-transparent mb-8 opacity-90" />

        <div className="space-y-6 mb-12">
          {/* Main Title */}
          <h1 className="text-white text-3xl md:text-6xl font-bold tracking-wide font-amiri drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
            {t.welcome}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-100 text-base md:text-2xl font-light tracking-wider font-noto max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t.subWelcome}
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/history">
          <button className="group relative px-8 md:px-12 py-3 md:py-4 overflow-hidden rounded-full bg-black/30 border border-school-gold/50 backdrop-blur-md transition-all duration-300 hover:bg-school-gold hover:border-school-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

            <span className="relative z-20 flex items-center gap-3 text-school-gold font-bold tracking-widest uppercase text-xs md:text-sm group-hover:text-school-dark transition-colors drop-shadow-md">
              {t.cta}
              {isAr ? (
                <ChevronRight className="rotate-180" size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </span>
          </button>
        </Link>
      </div>

      {/* 4. SCROLL INDICATOR (FIXED) */}
      {/* FIX: Used 'inset-x-0' (left:0, right:0) with 'justify-center'.
          This forces the container to span the full width and centers the content perfectly 
          without using translate transforms which can bug out on mobile.
      */}
      <div className="absolute bottom-12 inset-x-0 z-20 flex flex-col items-center justify-center gap-3 animate-bounce opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold font-noto drop-shadow-md text-center">
          {t.scroll}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-school-gold to-transparent" />
      </div>
    </section>
  );
}
