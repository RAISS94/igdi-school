"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    rights: isAr
      ? "© 2026 مدرسة ايكضي العتيقة. جميع الحقوق محفوظة."
      : "© 2026 IGDI School. All Rights Reserved.",
    privacy: isAr ? "سياسة الخصوصية" : "Privacy Policy",
    terms: isAr ? "شروط الاستخدام" : "Terms of Use",
    faq: isAr ? "الأسئلة الشائعة" : "FAQ",
  };

  return (
    <footer className="bg-[#0b1120] text-gray-500 py-6 border-t border-white/5 text-sm font-noto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="opacity-80">{t.rights}</p>

        {/* Legal Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="hover:text-school-gold transition-colors"
          >
            {t.privacy}
          </Link>
          <Link
            href="/terms"
            className="hover:text-school-gold transition-colors"
          >
            {t.terms}
          </Link>
          <Link
            href="/faq"
            className="hover:text-school-gold transition-colors"
          >
            {t.faq}
          </Link>
        </div>
      </div>
    </footer>
  );
}
