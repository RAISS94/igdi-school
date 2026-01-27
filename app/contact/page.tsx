"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function ContactPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [activeLocation, setActiveLocation] = useState<"main" | "second">(
    "main",
  );

  const t = {
    title: isAr ? "تواصل معنا" : "Contact Us",
    subtitle: isAr
      ? "نحن هنا للإجابة على استفساراتكم"
      : "We are here to answer your inquiries",
    formTitle: isAr ? "أرسل رسالة" : "Send a Message",
    name: isAr ? "الاسم الكامل" : "Full Name",
    email: isAr ? "البريد الإلكتروني" : "Email Address",
    message: isAr ? "الرسالة" : "Message",
    send: isAr ? "إرسال" : "Send Message",
    visit: isAr ? "زيارة المدرسة" : "Visit The School",
    hours: isAr ? "ساعات العمل" : "Working Hours",
  };

  return (
    <div className="min-h-screen bg-school-dark text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern.png')] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-school-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-school-gold text-xs font-bold uppercase tracking-widest mb-4">
            <Mail size={14} />
            <span>{isAr ? "خدمة العملاء" : "Support"}</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-amiri text-white mb-6 drop-shadow-lg">
            {t.title}
          </h1>
          <p className="text-gray-300 font-noto max-w-xl mx-auto text-lg">
            {t.subtitle}
          </p>
          <div className="w-1.5 h-1.5 bg-school-gold rotate-45 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* 1. THE FORM */}
          <div className="bg-white/5 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 h-fit">
            <h3 className="text-2xl font-amiri font-bold text-white mb-8 border-b border-white/10 pb-4">
              {t.formTitle}
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-school-gold focus:bg-black/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-school-gold focus:bg-black/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  {t.message}
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-school-gold focus:bg-black/40 transition-all"
                ></textarea>
              </div>
              <button className="w-full bg-school-gold text-school-dark font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Send size={18} />
                {t.send}
              </button>
            </form>
          </div>

          {/* 2. INFO & MAP */}
          <div className="space-y-8">
            {/* Toggle Buttons */}
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-full w-fit backdrop-blur-sm">
              <button
                onClick={() => setActiveLocation("main")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeLocation === "main" ? "bg-school-gold text-school-dark shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                {isAr ? "إيكضي (أنزي)" : "Igdi (Anzi)"}
              </button>
              <button
                onClick={() => setActiveLocation("second")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeLocation === "second" ? "bg-school-gold text-school-dark shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                {isAr ? "مؤسسة البيان (سيدي بيبي)" : "Al-Bayan (Sidi Bibi)"}
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-white/5 border border-white/10 text-white p-8 rounded-3xl relative overflow-hidden group hover:border-school-gold/30 transition-colors">
              <div className="relative z-10 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-school-gold/20 flex items-center justify-center shrink-0 text-school-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      {t.visit}
                    </p>
                    <p className="font-bold text-lg leading-relaxed font-amiri">
                      {activeLocation === "main"
                        ? isAr
                          ? "دوار إيكضي، جماعة إيكضي، دائرة أنزي"
                          : "Douar Igdi, Igdi Commune, Anzi"
                        : isAr
                          ? "مؤسسة البيان، سيدي بيبي، اشتوكة آيت باها"
                          : "Al-Bayan Institution, Sidi Bibi, Chtouka Ait Baha"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-school-gold/20 flex items-center justify-center shrink-0 text-school-gold">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <p className="font-bold font-mono text-lg">
                      {activeLocation === "main"
                        ? "+212 528 00 00 00"
                        : "+212 528 99 99 99"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. REAL MAP EMBED */}
            <div className="h-80 w-full bg-black/40 rounded-3xl overflow-hidden relative border border-white/10 shadow-lg group">
              {activeLocation === "main" ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1076.3106845487052!2d-9.265430499999999!3d29.589364000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb41c6fad000001%3A0x1f8bb8369bc007b7!2sSchool%20Traditional%20Teaching%20Islamique%20Igdi!5e1!3m2!1sen!2sma!4v1769523192933!5m2!1sen!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  // Removed grayscale: Map now shows original colors
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                // Fallback for Al-Bayan (No Embed yet)
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 text-center p-6">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
                    {isAr
                      ? "الخريطة غير متوفرة حالياً"
                      : "Map view coming soon"}
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Institution+Al+Bayan+Sidi+Bibi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-school-gold text-school-dark font-bold rounded-full text-xs hover:bg-white transition-colors"
                  >
                    {isAr ? "فتح في خرائط جوجل" : "Open in Google Maps"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
