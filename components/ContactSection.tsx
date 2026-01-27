"use client";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, ArrowLeft, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ContactSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const t = {
    sub: isAr ? "تواصل معنا" : "Visit Us",
    title: isAr ? "فروع المدرسة" : "Our Campuses",
    subtitle: isAr
      ? "نتشرف بزيارتكم في مقرنا الرئيسي أو فرعنا بشتوكة"
      : "We are honored to welcome you at our main headquarters or our Chtouka branch",
    mainBranch: isAr ? "المقر الرئيسي (إيكضي)" : "Main Campus (Igdi)",
    secondBranch: isAr
      ? "مؤسسة البيان (سيدي بيبي)"
      : "Al-Bayan Institution (Sidi Bibi)",
    getDirections: isAr ? "الاتجاهات" : "Get Directions",
    contactPage: isAr ? "نموذج التواصل" : "Contact Form",
  };

  return (
    // REDUCED PADDING HERE: py-24 -> py-16
    <section className="py-16 bg-[#0B1120] relative overflow-hidden">
      {/* Background World Map Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.png')] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER - Reduced bottom margin: mb-16 -> mb-12 */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-center md:text-right w-full md:w-auto">
            <span className="text-school-gold tracking-widest uppercase text-xs font-bold block mb-2">
              {t.sub}
            </span>
            <h2 className="text-4xl md:text-5xl font-amiri text-white mb-4">
              {t.title}
            </h2>
            <p className="text-gray-400 font-noto max-w-xl">{t.subtitle}</p>
          </div>

          {/* CONTACT BUTTON */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-3 px-6 py-2 border border-school-gold text-school-gold rounded-full font-bold hover:bg-school-gold hover:text-school-dark transition-all text-sm uppercase tracking-wider"
          >
            {t.contactPage}
            {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        {/* LOCATIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* LOCATION 1: IGDI (Main) */}
          <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-500">
            <span className="absolute top-4 right-4 text-6xl font-amiri text-white/5 font-bold group-hover:text-school-gold/10 transition-colors">
              01
            </span>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-school-gold/20 flex items-center justify-center text-school-gold">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-amiri text-white font-bold">
                  {t.mainBranch}
                </h3>
                <span className="text-xs text-school-gold uppercase tracking-wider font-bold">
                  {isAr ? "دائرة أنزي" : "Anzi District"}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-gray-400 text-sm mb-8 font-noto">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-school-gold shrink-0 mt-1" />
                <p>
                  {isAr
                    ? "دوار إيكضي، جماعة إيكضي، دائرة أنزي"
                    : "Douar Igdi, Igdi Commune, Anzi"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-school-gold shrink-0" />
                <p>+212 528 000 000</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <a
                href="https://www.google.com/maps/place/School+Traditional+Teaching+Islamique+Igdi/@29.5889257,-9.2663083,332m/data=!3m1!1e3!4m15!1m8!3m7!1s0xdb41c6e041f19e5:0x2aa389c6671a7b3b!2sIgdi!3b1!8m2!3d29.5864653!4d-9.2681797!16s%2Fg%2F11c6v_y032!3m5!1s0xdb41c6fad000001:0x1f8bb8369bc007b7!8m2!3d29.5893559!4d-9.2652195!16s%2Fg%2F11kj9058lv?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-school-gold transition-colors"
              >
                {t.getDirections}
                {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>
            </div>
          </div>

          {/* LOCATION 2: AL-BAYAN (Sidi Bibi) */}
          <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-500">
            <span className="absolute top-4 right-4 text-6xl font-amiri text-white/5 font-bold group-hover:text-school-gold/10 transition-colors">
              02
            </span>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-school-blue/20 flex items-center justify-center text-school-blue border border-school-blue/30">
                <Building2 size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-amiri text-white font-bold">
                  {t.secondBranch}
                </h3>
                <span className="text-xs text-blue-400 uppercase tracking-wider font-bold">
                  {isAr ? "الفرع الجديد" : "New Branch"}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-gray-400 text-sm mb-8 font-noto">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-1" />
                <p>
                  {isAr
                    ? "مؤسسة البيان، سيدي بيبي، اشتوكة آيت باها"
                    : "Al-Bayan Institution, Sidi Bibi, Chtouka Ait Baha"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <p>+212 528 999 999</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              {/* SEARCH LINK FOR SIDI BIBI (Safe Fallback) */}
              <a
                href="https://www.google.com/maps/search/Al-Bayan+Institution,+Sidi+Bibi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-blue-400 transition-colors"
              >
                {t.getDirections}
                {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-3 border border-school-gold text-school-gold rounded-full font-bold hover:bg-school-gold hover:text-school-dark transition-all"
          >
            {t.contactPage}
            {isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
      </div>
    </section>
  );
}
