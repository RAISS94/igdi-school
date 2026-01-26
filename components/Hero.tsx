// components/Hero.tsx
"use client";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();

  // Translation Object for Hero
  const t = {
    verse: "وَقُل رَّبِّ زِدْنِي عِلْمًا", // Always Arabic
    welcome:
      language === "ar"
        ? "مرحبا بكم في مدرسة إيكضي العتيقة"
        : "Welcome to the Traditional School of IGDI",
    subWelcome:
      language === "ar"
        ? "أصالة التعليم وعمق المعرفة"
        : "Authenticity of Education and Depth of Knowledge",
    historyBtn: language === "ar" ? "تاريخنا" : "Our History",
    onlineBtn: language === "ar" ? "المدرسة الرقمية" : "Online School",
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-school-blue">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/igdi-hero.jpeg"
          alt="Ecole Traditionnelle IGDI"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-school-dark/70 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h2 className="font-amiri text-5xl md:text-8xl text-school-gold mb-8 drop-shadow-lg leading-tight">
          "{t.verse}"
        </h2>

        <div className="text-white text-xl md:text-3xl font-light mb-12 font-noto space-y-2">
          <p>{t.welcome}</p>
          <p className="opacity-90 text-lg md:text-2xl text-school-sand">
            {t.subWelcome}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-school-gold hover:bg-yellow-600 text-school-dark font-bold py-4 px-12 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 text-lg">
            {t.historyBtn}
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-school-blue text-white font-bold py-4 px-12 rounded-full transition-all text-lg">
            {t.onlineBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
