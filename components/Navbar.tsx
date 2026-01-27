"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { Menu, Globe, ChevronRight, LogOut } from "lucide-react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = pathname === "/";
  const showSolidNavbar = isScrolled || !isHomePage;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const t = {
    home: language === "ar" ? "الرئيسية" : "Home",
    news: language === "ar" ? "أخبار" : "News",
    library: language === "ar" ? "المكتبة" : "Library",
    scholars: language === "ar" ? "شيوخنا" : "Scholars",
    contact: language === "ar" ? "تواصل معنا" : "Contact",
    donate: language === "ar" ? "تبرع" : "Donate",
    langCode: language === "ar" ? "EN" : "AR",
    schoolName: language === "ar" ? "مدرسة ايكضي" : "IGDI School",
    schoolSubtitle:
      language === "ar"
        ? "المدرسة العتيقة إيكضي"
        : "Traditional School of Igdi",
    closeMenu: language === "ar" ? "إغلاق القائمة" : "Close Menu",
  };

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.news, href: "/blog" },
    { name: t.library, href: "/library" },
    { name: t.scholars, href: "/scholars" },
    { name: t.contact, href: "/contact" }, // <--- CHANGED THIS LINK
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsMobileMenuOpen(false);
    // Removed the scroll logic for contact since it's now a real page
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Styles
  const textColor = showSolidNavbar ? "text-school-dark" : "text-white";
  const borderColor = showSolidNavbar
    ? "border-school-dark/20"
    : "border-white/30";
  const navBackground = showSolidNavbar
    ? "bg-white/95 backdrop-blur-md border-school-gold/30 shadow-lg py-2"
    : "bg-transparent border-transparent py-4";

  const logoSize = showSolidNavbar ? "w-12 h-12" : "w-16 h-16";
  const titleSize = showSolidNavbar ? "text-xl" : "text-2xl";
  const subtitleColor = showSolidNavbar
    ? "text-school-gold"
    : "text-school-sand";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out border-b ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, "/")}
            className="flex items-center gap-3 group z-50 relative"
          >
            <div
              className={`relative bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden transition-all duration-500 ${logoSize}`}
            >
              <Image
                src="/logo-igdi.jpg"
                alt="IGDI School"
                width={64}
                height={64}
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold font-amiri tracking-wide transition-colors leading-none ${textColor} ${titleSize}`}
              >
                {t.schoolName}
              </span>
              <span
                className={`font-noto font-medium tracking-wider transition-colors mt-1 ${subtitleColor} ${language === "ar" ? "text-[0.7rem]" : "text-[0.6rem] uppercase tracking-[0.15em]"}`}
              >
                {t.schoolSubtitle}
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 font-medium font-noto text-sm uppercase tracking-wider">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={i}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`transition-all hover:scale-105 relative group
                    ${isActive ? "text-school-gold font-bold" : textColor}
                    ${!isActive && "hover:text-school-gold"}
                  `}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-school-gold rounded-full"></span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/donate"
              className="px-6 py-2 bg-school-gold text-school-dark font-bold rounded-full hover:bg-white hover:shadow-lg transition-all shadow-md"
            >
              {t.donate}
            </Link>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-4 z-50">
            <button
              onClick={toggleLanguage}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${borderColor} hover:border-school-gold hover:bg-school-gold`}
            >
              <Globe
                size={14}
                className={`transition-colors ${textColor} group-hover:text-school-dark`}
              />
              <span
                className={`text-xs font-bold tracking-widest ${textColor} group-hover:text-school-dark`}
              >
                {t.langCode}
              </span>
            </button>

            <button
              className={`md:hidden p-2 transition ${textColor}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER (Unchanged) */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 backdrop-blur-sm ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[70] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <span className="text-school-dark font-bold font-amiri text-xl">
            {t.schoolName}
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2 bg-school-dark/5 text-school-dark rounded-full text-xs font-bold hover:bg-school-gold hover:text-white transition-colors"
          >
            <span>{t.closeMenu}</span>
            <LogOut
              size={14}
              className={language === "ar" ? "rotate-180" : ""}
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={i}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                  isActive
                    ? "bg-school-gold/10 text-school-gold font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:translate-x-2 rtl:hover:-translate-x-2"
                }`}
              >
                <span className="font-amiri text-lg">{link.name}</span>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-school-gold" />
                )}
                {!isActive && (
                  <ChevronRight
                    size={16}
                    className={`text-gray-300 ${language === "ar" ? "rotate-180" : ""}`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <Link
            href="/donate"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center w-full py-4 bg-school-gold text-school-dark font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            {t.donate}
          </Link>
          <div className="text-center mt-4">
            <span className="text-xs text-gray-400 font-noto uppercase tracking-widest">
              {t.schoolSubtitle}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
