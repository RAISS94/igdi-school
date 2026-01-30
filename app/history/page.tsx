"use client";
import { useState } from "react"; // Added useState
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, History, X, ZoomIn } from "lucide-react"; // Added X and ZoomIn
import { useLanguage } from "../../context/LanguageContext";

// --- CONTENT DATA ---
const historyEvents = [
  {
    year: "1940",
    title_ar: "التأسيس ووضع الحجر الأساس",
    title_en: "The Founding & First Stone",
    desc_ar:
      "في قلب جبال اشتوكة، وضع المؤسسون الأوائل اللبنة الأولى لهذا الصرح العلمي، بنية خالصة لوجه الله تعالى.",
    desc_en:
      "In the heart of the Chtouka mountains, the founding fathers laid the first stone of this scientific edifice, with pure intention for the sake of Allah.",
    image: "/igdi-hero.png",
  },
  {
    year: "1985",
    title_ar: "عصر التوسع والازدهار",
    title_en: "Era of Expansion",
    desc_ar:
      "شهدت المدرسة توسعة كبيرة لاستيعاب أعداد المتوافدين من طلبة العلم من مختلف ربوع المملكة.",
    desc_en:
      "The school witnessed a major expansion to accommodate the influx of students from various parts of the Kingdom.",
    image: "/igdi-hero.png",
  },
  {
    year: "2024",
    title_ar: "النهضة الرقمية",
    title_en: "The Digital Renaissance",
    desc_ar:
      "بدأت المدرسة مرحلة جديدة من التحديث، مع الحفاظ على جوهر التعليم العتيق الأصيل.",
    desc_en:
      "The school began a new phase of modernization, while preserving the essence of authentic traditional education.",
    image: "/igdi-hero.png",
  },
];

export default function HistoryPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // State for the Full Screen Image Modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-[#0B1120] min-h-screen text-white overflow-x-hidden font-noto">
      {/* --- 1. HERO HEADER --- */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/igdi-hero.png"
            alt="Old Igdi School Building"
            fill
            className="object-cover animate-slow-zoom opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B1120_100%)] opacity-80" />

        <div className="relative z-10 text-center space-y-6 px-4 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-school-gold/30 bg-school-gold/5 backdrop-blur-sm">
            <History size={14} className="text-school-gold" />
            <span className="text-school-gold tracking-[0.2em] uppercase text-xs font-bold">
              The Legacy
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-amiri text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#B8860B] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight py-2">
            مسيرة النور
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-school-gold to-transparent mx-auto opacity-70" />
          <p className="text-xl md:text-2xl text-gray-200 tracking-widest font-light drop-shadow-md">
            Journey of Light
          </p>
        </div>
      </div>

      {/* --- 2. THE TIMELINE CONTAINER --- */}
      <div className="max-w-6xl mx-auto px-6 pb-32 relative z-10">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-school-gold/50 to-transparent md:-translate-x-1/2 opacity-50 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>

        <div className="space-y-24">
          {historyEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${isEven ? "" : "md:flex-row-reverse"}`}
              >
                {/* Year Badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[0.45rem] md:-translate-x-1/2 w-4 h-4 rounded-full bg-school-gold border-4 border-[#0B1120] z-20 shadow-[0_0_20px_rgba(212,175,55,1)]">
                  <div className="absolute inset-0 bg-school-gold rounded-full animate-ping opacity-20" />
                </div>

                {/* TEXT CARD */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                >
                  <div className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-school-gold/30 transition-all duration-500 group">
                    <span
                      className="absolute -top-6 text-school-gold font-bold text-6xl font-amiri opacity-10 select-none group-hover:opacity-20 transition-opacity"
                      style={{ [isEven ? "right" : "left"]: "1rem" }}
                    >
                      {event.year}
                    </span>
                    <h2 className="text-3xl font-bold font-amiri text-white mb-3 relative z-10 group-hover:text-school-gold transition-colors">
                      {event.title_ar}
                    </h2>
                    <h3 className="text-sm font-bold tracking-widest uppercase text-school-gold/80 mb-4 font-noto">
                      {event.title_en}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                      {event.desc_ar}
                    </p>
                    <p className="block mt-3 opacity-60 italic text-xs text-gray-500">
                      {event.desc_en}
                    </p>
                  </div>
                </div>

                {/* IMAGE CARD (Clickable) */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pl-8" : "md:pr-8"}`}
                >
                  <div
                    onClick={() => setSelectedImage(event.image)} // Open Modal
                    className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
                  >
                    <Image
                      src={event.image}
                      alt={event.title_en}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* View Memory Button */}
                    <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 text-white text-xs uppercase tracking-widest border border-white/30 bg-black/30 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white hover:text-black transition-colors">
                        <ZoomIn size={14} />
                        View Memory
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- 3. BOTTOM SECTION --- */}
      <div className="relative py-32 bg-[#050914] border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-school-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-school-gold/5 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-amiri text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6">
            كن جزءاً من الحكاية
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-school-gold/50" />
            <h3 className="text-sm text-school-gold font-bold tracking-[0.3em] uppercase">
              Be Part of the Story
            </h3>
            <div className="h-px w-12 bg-school-gold/50" />
          </div>
          <p className="text-gray-400 leading-relaxed mb-12 font-noto max-w-2xl mx-auto text-lg">
            لقد حافظ أجدادنا على هذا الإرث العظيم، والآن جاء دورنا لنحمل المشعل.
            مساهمتك اليوم تضمن استمرار هذه المنارة العلمية للأجيال القادمة.
          </p>
          <Link
            href="/donate"
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-school-gold to-[#B8860B] text-school-dark font-bold text-lg rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative">ساهم في الوقف</span>
            <span className="relative text-xs uppercase opacity-70 border-l border-school-dark/20 pl-4 ml-2 font-bold tracking-wider">
              Support the Waqf
            </span>
            {isAr ? (
              <ArrowLeft className="relative" size={20} />
            ) : (
              <ArrowRight className="relative" size={20} />
            )}
          </Link>
        </div>
      </div>

      {/* --- 4. LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
            <X size={32} />
          </button>

          {/* Large Image */}
          <div className="relative w-full max-w-5xl h-[80vh] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={selectedImage}
              alt="Historical Memory"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
