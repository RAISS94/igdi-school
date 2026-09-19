"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { submitContactForm } from "./actions"; // We will create this file next

export default function ContactPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [activeLocation, setActiveLocation] = useState<"main" | "second">(
    "main",
  );
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

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
    sending: isAr ? "جاري الإرسال..." : "Sending...",
    success: isAr ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!",
    visit: isAr ? "زيارة المدرسة" : "Visit The School",
    phone: isAr ? "الهاتف" : "Phone",
    emailLabel: isAr ? "البريد الإلكتروني" : "Email",
  };

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setStatus(null);

    const result = await submitContactForm(formData);

    setIsPending(false);
    setStatus(result);

    if (result.success) {
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-32 pb-24 relative overflow-hidden font-noto">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-school-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-school-gold/30 bg-school-gold/5 backdrop-blur-sm mb-6">
            <Mail size={14} className="text-school-gold" />
            <span className="text-school-gold tracking-[0.2em] uppercase text-xs font-bold">
              {isAr ? "خدمة العملاء" : "Support"}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-amiri text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#B8860B] mb-6 drop-shadow-md">
            {t.title}
          </h1>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-school-gold to-transparent mx-auto opacity-50 mb-6" />

          <p className="text-xl text-gray-400 font-noto max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* 1. THE FORM */}
          <div className="bg-[#1A202C] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-school-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h3 className="relative z-10 text-3xl font-amiri font-bold text-white mb-8">
              {t.formTitle}
            </h3>

            <form
              id="contact-form"
              action={handleSubmit}
              className="space-y-6 relative z-10"
            >
              <div>
                <label className="block text-xs font-bold uppercase text-school-gold mb-2 tracking-widest">
                  {t.name}
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-school-gold/50 focus:bg-black/40 transition-all placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-school-gold mb-2 tracking-widest">
                  {t.email}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-school-gold/50 focus:bg-black/40 transition-all placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-school-gold mb-2 tracking-widest">
                  {t.message}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-school-gold/50 focus:bg-black/40 transition-all placeholder:text-gray-600 resize-none"
                ></textarea>
              </div>

              {/* Status Messages */}
              {status?.success && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-bold">
                  {t.success}
                </div>
              )}
              {status?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold">
                  {status.error}
                </div>
              )}

              <button
                disabled={isPending}
                className="w-full bg-school-gold text-school-dark font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:scale-100"
              >
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {isPending ? t.sending : t.send}
              </button>
            </form>
          </div>

          {/* 2. INFO & MAP */}
          <div className="space-y-8 flex flex-col h-full">
            <div className="self-center lg:self-start p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm flex">
              <button
                onClick={() => setActiveLocation("main")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeLocation === "main"
                    ? "bg-school-gold text-school-dark shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {isAr ? "إيكضي (أنزي)" : "Igdi (Anzi)"}
              </button>
              <button
                onClick={() => setActiveLocation("second")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeLocation === "second"
                    ? "bg-school-gold text-school-dark shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {isAr ? "مؤسسة البيان (سيدي بيبي)" : "Al-Bayan (Sidi Bibi)"}
              </button>
            </div>

            <div className="bg-[#1A202C] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-school-gold/30 transition-colors shadow-lg">
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-school-gold/10 flex items-center justify-center shrink-0 text-school-gold border border-school-gold/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      {t.visit}
                    </p>
                    <p className="font-bold text-lg leading-relaxed font-amiri text-white">
                      {activeLocation === "main"
                        ? isAr
                          ? "دوار إيكضي، جماعة إيكضي، دائرة أنزي، تيزنيت"
                          : "Douar Igdi, Igdi Commune, Anzi, Tiznit"
                        : isAr
                          ? "مؤسسة البيان، سيدي بيبي، اشتوكة آيت باها"
                          : "Al-Bayan Institution, Sidi Bibi, Chtouka Ait Baha"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-school-gold/10 flex items-center justify-center shrink-0 text-school-gold border border-school-gold/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      {t.phone}
                    </p>
                    <p className="font-bold font-mono text-lg text-white">
                      {activeLocation === "main"
                        ? "+212 528 00 00 00"
                        : "+212 528 99 99 99"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-school-gold/10 flex items-center justify-center shrink-0 text-school-gold border border-school-gold/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      {t.emailLabel}
                    </p>
                    <p className="font-bold text-lg text-white">
                      contact@igdi-school.ma
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* REAL MAP EMBED */}
            <div className="flex-1 min-h-[300px] w-full bg-[#151b2b] rounded-3xl overflow-hidden relative border border-white/10 shadow-lg group">
              <iframe
                key={activeLocation}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${
                  activeLocation === "main"
                    ? "Anzi+Tiznit+Morocco"
                    : "Sidi+Bibi+Morocco"
                }`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
