// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useLanguage } from "../context/LanguageContext";
import { Sun, Moon, Globe } from "lucide-react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const t = {
    home: language === "ar" ? "الرئيسية" : "Home",
    news: language === "ar" ? "أخبار" : "News",
    library: language === "ar" ? "المكتبة" : "Library",
    donate: language === "ar" ? "تبرع" : "Donate",
    langName: language === "ar" ? "English" : "العربية",
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-school-blue shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section - Updated for Visibility */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo-igdi.png"
              alt="IGDI Logo"
              width={64}
              height={64}
              className="object-contain p-1"
              unoptimized // Forces the image to load directly
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg font-amiri leading-tight drop-shadow-md">
              {language === "ar" ? "مدرسة ايكضي العتيقة" : "IGDI School"}
            </span>
            <span className="text-school-sand text-xs font-light opacity-90 hidden sm:block">
              {language === "ar"
                ? "أصالة التعليم وعمق المعرفة"
                : "Tradition & Knowledge"}
            </span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-white font-medium font-noto">
          <Link
            href="/"
            className="hover:text-school-gold transition relative group"
          >
            {t.home}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-school-gold transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/blog" className="hover:text-school-gold transition">
            {t.news}
          </Link>
          <Link href="/library" className="hover:text-school-gold transition">
            {t.library}
          </Link>
          <Link
            href="/donate"
            className="text-school-gold border border-school-gold px-4 py-1 rounded-full hover:bg-school-gold hover:text-school-dark transition"
          >
            {t.donate}
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition backdrop-blur-md"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-sm hover:bg-white hover:text-school-blue transition font-bold backdrop-blur-md"
          >
            <Globe size={16} />
            {t.langName}
          </button>
        </div>
      </div>
    </nav>
  );
}
