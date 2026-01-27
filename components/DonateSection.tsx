"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function DonationSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    title: isAr ? "الوقف والصدقة الجارية" : "Waqf & Sadaqah Jariyah",
    subtitle: isAr
      ? "ساهم في بناء مستقبل طلبة العلم وحفظة كتاب الله"
      : "Contribute to the future of knowledge seekers and Quran memorizers",
    quote: isAr
      ? "إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية..."
      : "When a person dies, his deeds come to an end except for three: Sadaqah Jariyah...",
    impactTitle: isAr
      ? "أين تذهب مساهمتكم؟"
      : "Where does your contribution go?",
    cta: isAr ? "ساهم الآن" : "Donate Now",
    secure: isAr ? "تبرع آمن عبر البنك" : "Secure Bank Transfer",
    impacts: [
      isAr
        ? "كفالة طلبة العلم (المأكل والمشرب)"
        : "Sponsoring students (Food & Shelter)",
      isAr ? "صيانة مرافق المدرسة والمسجد" : "Maintenance of school & mosque",
      isAr ? "طباعة المصاحف والكتب العلمية" : "Printing Qurans & Books",
    ],
  };

  return (
    // REDUCED PADDING: py-16
    <section className="relative py-16 bg-school-dark overflow-hidden text-white">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-school-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* COLUMN 1: The Hook (Title & Spiritual Context) */}
          <div className="text-center lg:text-start space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-school-gold text-xs font-bold uppercase tracking-widest">
              <Heart size={14} className="fill-school-gold" />
              <span>{t.title}</span>
            </span>

            <h2 className="text-4xl md:text-5xl font-amiri leading-tight">
              {t.subtitle}
            </h2>

            {/* Quote Block */}
            <div className="relative p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="absolute top-0 left-6 -translate-y-1/2 bg-school-dark px-2 text-school-gold">
                <span className="text-3xl font-serif">"</span>
              </div>
              <p className="text-lg text-gray-300 font-amiri italic leading-relaxed">
                {t.quote}
              </p>
            </div>
          </div>

          {/* COLUMN 2: The Action (Impact List & Button) */}
          <div className="lg:border-l lg:border-white/10 lg:pl-12 rtl:lg:pl-0 rtl:lg:pr-12 rtl:lg:border-l-0 rtl:lg:border-r">
            <div className="mb-8">
              <h3 className="text-xl font-bold font-amiri text-white mb-4 flex items-center gap-2">
                {t.impactTitle}
              </h3>
              <ul className="space-y-4">
                {t.impacts.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-400 text-sm"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-school-gold shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/donate"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-school-gold to-[#B8860B] text-school-dark font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-all duration-300"
              >
                <span>{t.cta}</span>
                {isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <ShieldCheck size={16} className="text-green-500" />
                <span>{t.secure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
