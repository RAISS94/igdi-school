"use client";
import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function NewsletterDonateSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    newsTitle: isAr ? "النشرة البريدية" : "Newsletter",
    newsDesc: isAr ? "اشترك ليصلك جديد الدروس." : "Get the latest updates.",
    placeholder: isAr ? "البريد الإلكتروني" : "Email address",
    subscribe: isAr ? "اشتراك" : "Subscribe",
    donateTitle: isAr ? "دعم المدرسة" : "Support Us",
    donateBtn: isAr ? "تبرع الآن" : "Donate Now",
  };

  return (
    // CHANGED: py-12 -> py-24 (Bigger, but not huge)
    <section className="py-24 bg-[#0B1120] border-t border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* LEFT: Newsletter */}
          <div className="flex-1 w-full lg:w-auto flex flex-col md:flex-row items-center gap-8">
            <div
              className={`text-center ${isAr ? "md:text-right" : "md:text-left"}`}
            >
              <div className="flex items-center justify-center md:justify-start gap-3 text-white mb-2">
                <Mail size={24} className="text-school-gold" />
                <h3 className="font-amiri font-bold text-2xl">{t.newsTitle}</h3>
              </div>
              <p className="text-gray-400 text-sm font-noto">{t.newsDesc}</p>
            </div>

            {/* Input Bar */}
            <form
              className="relative w-full md:max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-full h-12 pl-6 pr-24 text-white focus:outline-none focus:border-school-gold transition-colors"
              />
              <button
                type="submit"
                className={`absolute top-1.5 bottom-1.5 bg-school-gold hover:bg-white text-school-dark rounded-full px-6 text-sm font-bold transition-colors ${isAr ? "left-1.5" : "right-1.5"}`}
              >
                {t.subscribe}
              </button>
            </form>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block w-px h-16 bg-white/10" />

          {/* RIGHT: Donate Action */}
          <div className="flex items-center gap-8">
            <div
              className={`hidden md:block ${isAr ? "text-right" : "text-left"}`}
            >
              <h3 className="font-amiri font-bold text-2xl text-white">
                {t.donateTitle}
              </h3>
              <p className="text-gray-400 text-sm">Build the future.</p>
            </div>

            <Link
              href="/donate"
              className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-school-gold to-[#B8860B] text-school-dark font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1"
            >
              <Heart size={20} fill="currentColor" />
              <span>{t.donateBtn}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
