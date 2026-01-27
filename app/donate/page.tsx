"use client";
import { useState } from "react";
import {
  Copy,
  Check,
  Building2,
  Globe,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function DonatePage() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = {
    bankName: "Al Barid Bank",
    accountName: "Association Ecole Igdi",
    rib: "123 456 78901234567890 12",
    swift: "ABBKMAMC",
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const t = {
    title: isAr ? "ساهم في الوقف" : "Support the Waqf",
    subtitle: isAr
      ? "صدقة جارية تنير دروب العلم"
      : "A Sadaqah Jariyah that lights the paths of knowledge",
    bankTitle: isAr ? "الحساب البنكي الرسمي" : "Official Bank Account",
    copy: isAr ? "نسخ" : "Copy",
    copied: isAr ? "تم النسخ" : "Copied",
    ribLabel: "RIB (Relevé d'Identité Bancaire)",
    swiftLabel: "SWIFT / BIC Code",
    usageTitle: isAr ? "أين تذهب مساهمتكم؟" : "Where does your donation go?",
  };

  return (
    <div className="min-h-screen bg-school-dark text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern.png')] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-school-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-school-gold text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck size={14} />
            <span>Secure Donation</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-amiri text-white mb-4 drop-shadow-lg">
            {t.title}
          </h1>
          <p className="text-gray-300 font-noto max-w-xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 1. THE BANK CARD (Updated: Glass Effect) */}
          {/* Replaced 'bg-white' with 'bg-white/5 backdrop-blur-md' to match right side */}
          <div className="bg-white/5 backdrop-blur-md text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group border border-white/10">
            {/* Card Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-school-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <Building2 size={32} className="text-school-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest border border-white/20 px-2 py-1 rounded text-gray-400">
                  {t.bankTitle}
                </span>
              </div>

              <div className="space-y-6">
                {/* Account Name */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Beneficiary Name
                  </p>
                  <p className="font-amiri text-2xl text-school-gold font-bold">
                    {bankDetails.accountName}
                  </p>
                </div>

                {/* RIB Display (Glass Box) */}
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 hover:border-school-gold/50 transition-colors group/rib">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {t.ribLabel}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bankDetails.rib, "rib")}
                      className="text-school-gold hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      {copiedField === "rib" ? (
                        <Check size={12} />
                      ) : (
                        <Copy size={12} />
                      )}
                      {copiedField === "rib" ? t.copied : t.copy}
                    </button>
                  </div>
                  <p className="font-mono text-lg md:text-xl tracking-wider text-white break-all group-hover/rib:text-school-gold transition-colors">
                    {bankDetails.rib}
                  </p>
                </div>

                {/* SWIFT Display (Glass Box) */}
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 hover:border-school-gold/50 transition-colors group/swift">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {t.swiftLabel}
                    </p>
                    <button
                      onClick={() =>
                        copyToClipboard(bankDetails.swift, "swift")
                      }
                      className="text-school-gold hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      {copiedField === "swift" ? (
                        <Check size={12} />
                      ) : (
                        <Copy size={12} />
                      )}
                      {copiedField === "swift" ? t.copied : t.copy}
                    </button>
                  </div>
                  <p className="font-mono text-xl tracking-wider text-white group-hover/swift:text-school-gold transition-colors">
                    {bankDetails.swift}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-gray-400 font-medium">
                <Globe size={16} className="text-school-gold" />
                <span>International Transfers Accepted</span>
              </div>
            </div>
          </div>

          {/* 2. Impact Categories (Right Side - Unchanged Style) */}
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-amiri text-white mb-6 border-b border-white/10 pb-4">
              {t.usageTitle}
            </h3>

            {[
              {
                icon: Building2,
                title_ar: "صيانة المدرسة والمرافق",
                title_en: "School Maintenance",
                desc_ar: "توفير بيئة تعليمية آمنة ولائقة.",
                desc_en: "Ensuring a safe and decent learning environment.",
              },
              {
                icon: Heart,
                title_ar: "كفالة طلبة العلم",
                title_en: "Sponsoring Students",
                desc_ar: "توفير المأكل والمشرب والملبس للطلبة.",
                desc_en: "Providing food, housing, and clothing for students.",
              },
              {
                icon: Globe,
                title_ar: "نشر المصحف الشريف",
                title_en: "Quran Distribution",
                desc_ar: "طباعة وتوزيع المصاحف والكتب العلمية.",
                desc_en:
                  "Printing and distributing Qurans and educational books.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-school-gold/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-school-gold/20 flex items-center justify-center text-school-gold shrink-0">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg font-amiri">
                    {isAr ? item.title_ar : item.title_en}
                  </h4>
                  <p className="text-sm text-gray-400 font-noto">
                    {isAr ? item.desc_ar : item.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
