"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, Globe } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext"; // Ensure path is correct

export default function LoginPage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const isAr = language === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const t = {
    title: isAr ? "بوابة القيادة" : "QIYADA CONTROL",
    subtitle: isAr ? "للأشخاص المصرح لهم فقط" : "Authorized Personnel Only",
    emailLabel: isAr ? "معرف النظام" : "System ID (Email)",
    passwordLabel: isAr ? "رمز المرور" : "Passcode",
    button: isAr ? "تسجيل الدخول" : "Access Dashboard",
    loading: isAr ? "جاري التحقق..." : "Authenticating...",
    error: isAr
      ? "بيانات الدخول غير صحيحة"
      : "Invalid credentials. Access Denied.",
    toggleLang: isAr ? "English" : "العربية",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(t.error);
      setLoading(false);
    } else {
      router.push("/qiyada");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6 font-noto relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Language Toggle (Top Corner) */}
      <button
        onClick={() => setLanguage(isAr ? "en" : "ar")}
        className={`absolute top-6 z-50 text-gray-400 hover:text-white flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 transition-all hover:bg-white/10 ${isAr ? "left-6" : "right-6"}`}
      >
        <Globe size={16} />
        <span className="text-xs font-bold">{t.toggleLang}</span>
      </button>

      <div className="w-full max-w-md bg-[#1A202C] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-school-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-school-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-school-gold/20 text-school-gold">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-amiri font-bold text-white mb-2">
            {t.title}
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 px-1">
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-school-gold/50 transition-all placeholder:text-gray-600 ltr:text-left rtl:text-right"
              dir="ltr"
              placeholder="admin@igdi.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 px-1">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-school-gold/50 transition-all placeholder:text-gray-600 ltr:text-left rtl:text-right"
              dir="ltr"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-school-gold text-school-dark font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.loading : t.button}
          </button>
        </form>
      </div>
    </div>
  );
}
