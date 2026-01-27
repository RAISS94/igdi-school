"use client";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { useLanguage } from "../context/LanguageContext";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const { language } = useLanguage();

  const t = {
    verse: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    welcome:
      language === "ar" ? "مدرسة ايكضي العتيقة" : "Traditional School of IGDI",
    subWelcome:
      language === "ar"
        ? "حيث تلتقي أصالة التراث بآفاق المستقبل"
        : "Where Heritage Meets the Future",
    cta: language === "ar" ? "اكتشف تاريخنا" : "Discover Our Legacy",
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Slow Zoom Effect */}
      <div className="absolute inset-0 z-0 animate-slow-zoom">
        <Image
          src="/igdi-hero.png"
          alt="Ecole Traditionnelle IGDI - Historical Building" // SEO: Descriptive Alt
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-school-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
        <h2 className="font-amiri text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-school-gold to-yellow-600 mb-8 drop-shadow-2xl leading-tight py-2">
          "{t.verse}"
        </h2>

        <div className="space-y-4 mb-12">
          {/* SEO: H1 is crucial for the homepage */}
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-wide font-amiri">
            {t.welcome}
          </h1>
          <p className="text-school-sand/80 text-lg md:text-xl font-light tracking-wider font-noto">
            {t.subWelcome}
          </p>
        </div>

        {/* Updated Button with Link */}
        <Link href="/history">
          <button className="group relative px-10 py-4 bg-transparent border border-school-gold text-school-gold font-bold tracking-widest uppercase overflow-hidden rounded-sm transition-all hover:text-school-dark">
            <span className="absolute inset-0 w-0 bg-school-gold transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center gap-3">
              {t.cta}
              <ArrowDown className="animate-bounce" size={18} />
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
}
