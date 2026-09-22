"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { Menu, Globe, LogOut, GraduationCap } from "lucide-react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = {
    home: language === "ar" ? "الرئيسية" : "Home",
    news: language === "ar" ? "أخبار" : "News",
    library: language === "ar" ? "المكتبة" : "Library",
    courses: language === "ar" ? "الدروس" : "Courses",
    scholars: language === "ar" ? "شيوخنا" : "Scholars",
    contact: language === "ar" ? "تواصل معنا" : "Contact",
    register: language === "ar" ? "التسجيل" : "Register",
    schoolName: language === "ar" ? "مدرسة ايكضي" : "IGDI School",
    subtitle: language === "ar" ? "المدرسة العتيقة" : "Traditional School",
    langCode: language === "ar" ? "EN" : "AR",
    closeMenu: language === "ar" ? "إغلاق" : "Close",
  };

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.courses, href: "/courses" },
    { name: t.library, href: "/library" },
    { name: t.scholars, href: "/scholars" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <>
      {/* 1. SOLID DARK BACKGROUND - Always Visible */}
      <nav className="fixed top-0 w-full z-50 bg-school-dark border-b border-white/10 h-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center p-1">
              <Image
                src="/logo-igdi.jpg"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-white">
              <span className="font-bold font-amiri text-lg md:text-xl leading-none">
                {t.schoolName}
              </span>
              <span className="text-[10px] text-school-gold font-noto tracking-widest uppercase mt-1">
                {t.subtitle}
              </span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-school-gold ${
                  pathname === link.href ? "text-school-gold" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/register"
              className="flex items-center gap-2 px-5 py-2 bg-school-gold text-school-dark font-bold rounded-full text-sm hover:bg-white transition-colors"
            >
              <GraduationCap size={18} />
              {t.register}
            </Link>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-school-gold flex items-center gap-1 border border-white/20 px-3 py-1 rounded-full"
            >
              <Globe size={14} />
              <span className="text-xs font-bold">{t.langCode}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU - Always rendered, controlled via CSS transitions */}
      <div
        className={`fixed inset-0 z-[60] flex justify-end transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop Fade */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Slide */}
        <div
          className={`relative bg-white w-[85%] max-w-sm h-full shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0"
              : language === "ar"
                ? "-translate-x-full"
                : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold font-amiri text-2xl text-school-dark">
              {t.schoolName}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-1 text-red-500 font-bold text-sm"
            >
              <LogOut size={16} /> {t.closeMenu}
            </button>
          </div>
          <div className="space-y-2">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-4 rounded-xl bg-gray-50 hover:bg-school-gold/10 font-bold text-gray-800 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-4 rounded-xl bg-school-gold text-school-dark font-bold text-center mt-4 transition-transform hover:scale-[1.02]"
            >
              {t.register}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
