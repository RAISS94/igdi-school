"use client";
import Link from "next/link";
import { Facebook, Instagram, Youtube, GraduationCap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    brand: isAr ? "مدرسة إيكضي" : "IGDI School",
    desc: isAr
      ? "منارة للعلم والتربية وحفظ القرآن الكريم."
      : "A beacon of knowledge and Quran preservation.",

    // Headers
    discover: isAr ? "اكتشف" : "Discover",
    links: isAr ? "روابط" : "Links",

    // Links Content
    news: isAr ? "أخبار المدرسة" : "School News",
    contact: isAr ? "تواصل معنا" : "Contact",
    donate: isAr ? "تبرع" : "Donate",

    rights: isAr ? "جميع الحقوق محفوظة" : "All rights reserved",
    dev: isAr
      ? "تطوير: يحيى بن جدي (خريج المدرسة)"
      : "Developed by Yahya Benjdy (Igdi Graduate)",
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t border-white/5 font-noto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Socials (Takes 2 columns) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-3xl font-amiri font-bold text-school-gold">
              {t.brand}
            </h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              {t.desc}
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-school-gold transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Discover: ONLY News/Blog */}
          <div>
            <h4 className="font-bold text-white mb-4">{t.discover}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-school-gold transition-colors"
                >
                  {t.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: ONLY Contact & Donate */}
          <div>
            <h4 className="font-bold text-white mb-4">{t.links}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-school-gold transition-colors"
                >
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-school-gold hover:text-white transition-colors"
                >
                  {t.donate}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © 2026 {t.brand}. {t.rights}.
          </p>

          {/* Developer Credit */}
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
            <GraduationCap size={14} className="text-school-gold" />
            <span>{t.dev}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
