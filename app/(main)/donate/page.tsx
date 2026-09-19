"use client";
import { useState } from "react";
import {
  Copy,
  Check,
  Building2,
  Globe,
  Heart,
  ShieldCheck,
  Wifi,
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
    clickToCopy: isAr ? "اضغط للنسخ" : "Tap to copy", // NEW TRANSLATION
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white pt-32 pb-24 relative overflow-hidden font-noto">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-school-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-school-gold/30 bg-school-gold/5 backdrop-blur-sm mb-6">
            <ShieldCheck size={14} className="text-school-gold" />
            <span className="text-school-gold tracking-[0.2em] uppercase text-xs font-bold">
              Secure Donation
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-amiri text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#B8860B] mb-6 drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400 font-noto max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* CHANGED: Removed 'items-start' and replaced with specific grid alignment if needed, but items-start is usually good. 
           The key fix is removing padding from the children. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* 1. THE PREMIUM BANK CARD */}
          <div className="relative group perspective-1000 order-2 lg:order-none">
            {" "}
            {/* Added order for mobile responsiveness if needed */}
            {/* Glow */}
            <div className="absolute inset-0 bg-school-gold/20 blur-3xl -z-10 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
            {/* The Card */}
            <div className="relative w-full aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 md:p-10 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.07] mix-blend-overlay pointer-events-none" />

              {/* Top Row */}
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-8 md:w-12 md:h-10 bg-gradient-to-br from-[#fbbf24] to-[#b45309] rounded-md border border-white/20 relative overflow-hidden shadow-inner">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-black/20" />
                    <div className="absolute top-0 left-1/2 h-full w-px bg-black/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-3 border border-black/20 rounded-sm" />
                  </div>
                  <Wifi size={24} className="text-white/30 rotate-90" />
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-white text-sm md:text-lg tracking-wider uppercase opacity-90">
                    {bankDetails.bankName}
                  </h3>
                  <p className="text-[8px] md:text-[10px] text-school-gold uppercase tracking-[0.2em]">
                    Official Account
                  </p>
                </div>
              </div>

              {/* Middle (RIB) - CHANGED for Mobile Usability */}
              <div className="z-10 my-auto py-4">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[10px] text-white/50 uppercase tracking-widest ml-1">
                    {t.ribLabel}
                  </p>
                  {/* Always Visible "Tap to copy" hint */}
                  <span className="text-[10px] text-school-gold/70 flex items-center gap-1 animate-pulse">
                    <Copy size={10} /> {t.clickToCopy}
                  </span>
                </div>

                {/* Clickable Area */}
                <div
                  className="relative cursor-pointer active:scale-95 transition-transform"
                  onClick={() => copyToClipboard(bankDetails.rib, "rib")}
                >
                  <p className="font-mono text-xl md:text-3xl text-white tracking-widest drop-shadow-md hover:text-school-gold transition-colors truncate border-b border-white/10 pb-2 border-dashed hover:border-school-gold/50">
                    {bankDetails.rib}
                  </p>

                  {/* Success Feedback Overlay */}
                  {copiedField === "rib" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-school-gold/90 text-school-dark font-bold rounded backdrop-blur-sm animate-in fade-in zoom-in duration-200">
                      <Check size={18} className="mr-2" /> {t.copied}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-end z-10">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                    Beneficiary
                  </p>
                  <p className="font-mono text-xs md:text-sm text-white/90 uppercase tracking-wider">
                    {bankDetails.accountName}
                  </p>
                </div>

                <div
                  className="text-right cursor-pointer active:scale-95 transition-transform"
                  onClick={() => copyToClipboard(bankDetails.swift, "swift")}
                >
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                    SWIFT
                  </p>
                  <div className="flex items-center justify-end gap-2 relative">
                    <p className="font-mono text-sm md:text-base text-white/90 uppercase tracking-wider hover:text-school-gold transition-colors border-b border-dashed border-white/10">
                      {bankDetails.swift}
                    </p>
                    {/* Always Visible Icon */}
                    {copiedField === "swift" ? (
                      <Check size={14} className="text-green-400" />
                    ) : (
                      <Copy size={14} className="text-white/30" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Impact Categories */}
          {/* CHANGED: Removed 'pt-4' so it aligns perfectly with the top of the card */}
          <div className="space-y-8 order-1 lg:order-none">
            <h3 className="text-3xl font-amiri text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-school-gold rounded-full" />
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
                className="group flex gap-5 p-5 rounded-2xl bg-[#1A202C] border border-white/5 hover:border-school-gold/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-school-gold/10 flex items-center justify-center text-school-gold shrink-0 group-hover:scale-110 transition-transform duration-300 border border-school-gold/20">
                  <item.icon size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl font-amiri mb-2 group-hover:text-school-gold transition-colors">
                    {isAr ? item.title_ar : item.title_en}
                  </h4>
                  <p className="text-sm text-gray-400 font-noto leading-relaxed">
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
