"use client";
import { useState } from "react";
import {
  School,
  Wifi,
  BookOpen,
  User,
  Phone,
  Mail,
  MapPin,
  Send,
  Calendar,
  CheckCircle2,
  Info,
  Loader2, // Added for loading state
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { submitRegistration } from "./action"; // Import the bridge

export default function RegisterPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [program, setProgram] = useState<"igdi" | "bayan" | "online">("igdi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = {
    title: isAr ? "التسجيل والالتحاق" : "Registration",
    subtitle: isAr
      ? "انضم إلى ركب طلبة العلم في مؤسساتنا"
      : "Join the path of knowledge in our institutions",
    prog_igdi: isAr ? "مدرسة إيكضي (داخلي)" : "Igdi School (Boarding)",
    prog_bayan: isAr ? "مؤسسة البيان (أولي/ابتدائي)" : "Al-Bayan (Primary)",
    prog_online: isAr ? "التعليم عن بعد" : "Online Education",
    lbl_student: isAr ? "اسم الطالب" : "Student Name",
    lbl_phone: isAr ? "رقم الهاتف" : "Phone Number",
    lbl_email: isAr ? "البريد الإلكتروني" : "Email Address",
    lbl_age: isAr ? "العمر" : "Age",
    lbl_city: isAr ? "المدينة" : "City",
    contact_msg: isAr
      ? "سنتواصل معكم قريباً عبر الهاتف لتأكيد طلب التسجيل واستكمال الإجراءات."
      : "We will contact you shortly via phone to confirm your registration.",
    submit: isAr ? "إرسال طلب التسجيل" : "Submit Application",
    secure: isAr
      ? "بياناتكم في أمان وسرية تامة"
      : "Your data is secure and confidential",
    success_title: isAr ? "تم استلام طلبكم بنجاح!" : "Application Received!",
    success_desc: isAr
      ? "شكراً لك. سيقوم الحارس العام بالتواصل معكم قريباً."
      : "Thank you. The administration will contact you shortly.",
    new_app: isAr ? "تسجيل طالب آخر" : "Register Another Student",
  };

  // --- THE SUBMIT HANDLER ---
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    // Add the program manually since it's a state, not an input
    formData.append("program", program);

    const result = await submitRegistration(formData);

    if (result.success) {
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("Error: " + result.message);
    }
    setIsSubmitting(false);
  }

  // --- SUCCESS SCREEN ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center p-6 relative overflow-hidden font-noto">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] pointer-events-none" />
        <div className="bg-[#1A202C] border border-school-gold/30 rounded-3xl p-12 text-center max-w-lg shadow-[0_0_50px_rgba(212,175,55,0.1)] relative z-10">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-amiri font-bold text-school-gold mb-4">
            {t.success_title}
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">{t.success_desc}</p>
          <button
            onClick={() => {
              setIsSuccess(false);
              window.location.reload();
            }}
            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-xl transition-all"
          >
            {t.new_app}
          </button>
        </div>
      </div>
    );
  }

  // --- FORM SCREEN ---
  return (
    <div
      className="min-h-screen bg-[#0B1120] text-white pt-32 pb-24 relative overflow-hidden font-noto"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-school-gold/30 bg-school-gold/5 backdrop-blur-sm mb-6">
            <School size={14} className="text-school-gold" />
            <span className="text-school-gold tracking-[0.2em] uppercase text-xs font-bold">
              {isAr ? "بوابة القبول" : "Admissions"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-amiri text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#B8860B] mb-4 drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400 font-noto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {["igdi", "bayan", "online"].map((p) => (
            <button
              key={p}
              type="button" // Important: Prevent this button from submitting the form
              onClick={() => setProgram(p as any)}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 group relative overflow-hidden ${
                program === p
                  ? "bg-school-gold border-school-gold text-school-dark shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  : "bg-[#1A202C] border-white/5 text-gray-400 hover:border-school-gold/50 hover:text-white"
              }`}
            >
              <div
                className={`p-3 rounded-full ${program === p ? "bg-black/10" : "bg-white/5"}`}
              >
                {p === "igdi" ? (
                  <School size={24} />
                ) : p === "bayan" ? (
                  <BookOpen size={24} />
                ) : (
                  <Wifi size={24} />
                )}
              </div>
              <span className="font-bold text-sm font-noto text-center">
                {p === "igdi"
                  ? t.prog_igdi
                  : p === "bayan"
                    ? t.prog_bayan
                    : t.prog_online}
              </span>
              {program === p && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-[#1A202C] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative">
          <div className="mb-8 p-4 rounded-xl bg-school-gold/5 border border-school-gold/20 flex items-center gap-3 text-school-gold text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-school-gold animate-pulse" />
            <span>
              {isAr ? "أنت تقوم بالتسجيل في: " : "You are registering for: "}
              <span className="font-bold underline">
                {program === "igdi"
                  ? t.prog_igdi
                  : program === "bayan"
                    ? t.prog_bayan
                    : t.prog_online}
              </span>
            </span>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                  <User size={12} /> {t.lbl_student}
                </label>
                {/* ADDED name="studentName" */}
                <input
                  name="studentName"
                  required
                  type="text"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-school-gold focus:bg-black/40 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                  <Calendar size={12} /> {t.lbl_age}
                </label>
                {/* ADDED name="age" */}
                <input
                  name="age"
                  required
                  type="number"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-school-gold focus:bg-black/40 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                  <Phone size={12} /> {t.lbl_phone}
                </label>
                {/* ADDED name="phone" */}
                <input
                  name="phone"
                  required
                  type="tel"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-school-gold focus:bg-black/40 outline-none transition-all placeholder:text-gray-600"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                  <MapPin size={12} /> {t.lbl_city}
                </label>
                {/* ADDED name="city" */}
                <input
                  name="city"
                  required
                  type="text"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-school-gold focus:bg-black/40 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                <Mail size={12} /> {t.lbl_email}{" "}
                <span className="opacity-50 text-[10px] lowercase">
                  (optional)
                </span>
              </label>
              {/* ADDED name="email" */}
              <input
                name="email"
                type="email"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-school-gold focus:bg-black/40 outline-none transition-all placeholder:text-gray-600"
                dir="ltr"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-start">
              <Info className="text-school-gold shrink-0 mt-1" size={20} />
              <p className="text-sm text-gray-300 leading-relaxed">
                {t.contact_msg}
              </p>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-school-gold text-school-dark font-bold py-4 rounded-xl hover:bg-white hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isSubmitting ? "..." : t.submit}
            </button>

            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2 mt-4">
              <CheckCircle2 size={12} className="text-green-500" />
              {t.secure}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
