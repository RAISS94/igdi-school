import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: "History & Legacy | Ecole Traditionnelle IGDI",
  description:
    "Explore the rich history of Madrasat Igdi, from its ancient founding to its modern revival. A journey of knowledge and spiritual heritage in Morocco.",
};

// --- 2. CONTENT DATA (Bilingual) ---
const historyEvents = [
  {
    year: "1940",
    title_ar: "التأسيس ووضع الحجر الأساس",
    title_en: "The Founding & First Stone",
    desc_ar:
      "في قلب جبال اشتوكة، وضع المؤسسون الأوائل اللبنة الأولى لهذا الصرح العلمي، بنية خالصة لوجه الله تعالى.",
    desc_en:
      "In the heart of the Chtouka mountains, the founding fathers laid the first stone of this scientific edifice, with pure intention for the sake of Allah.",
    image: "/igdi-hero.jpeg", // Replace with real historical photos later
  },
  {
    year: "1985",
    title_ar: "عصر التوسع والازدهار",
    title_en: "Era of Expansion",
    desc_ar:
      "شهدت المدرسة توسعة كبيرة لاستيعاب أعداد المتوافدين من طلبة العلم من مختلف ربوع المملكة.",
    desc_en:
      "The school witnessed a major expansion to accommodate the influx of students from various parts of the Kingdom.",
    image: "/igdi-hero.jpeg",
  },
  {
    year: "2024",
    title_ar: "النهضة الرقمية",
    title_en: "The Digital Renaissance",
    desc_ar:
      "بدأت المدرسة مرحلة جديدة من التحديث، مع الحفاظ على جوهر التعليم العتيق الأصيل.",
    desc_en:
      "The school began a new phase of modernization, while preserving the essence of authentic traditional education.",
    image: "/igdi-hero.jpeg",
  },
];

export default function HistoryPage() {
  return (
    <div className="bg-school-dark min-h-screen text-white overflow-x-hidden">
      {/* --- 3. HERO HEADER --- */}
      <div className="relative h-[60vh] flex items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/igdi-hero.jpeg"
            alt="Old Igdi School Building"
            fill
            className="object-cover grayscale" // Grayscale only for the hero background to make text pop
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-school-dark via-school-dark/50 to-school-dark" />
        </div>

        {/* Text Layer */}
        <div className="relative z-10 text-center space-y-4 px-4">
          <span className="text-school-gold tracking-[0.3em] uppercase text-sm font-bold block animate-fade-in-up">
            The Legacy
          </span>
          <h1 className="text-5xl md:text-7xl font-amiri text-white drop-shadow-2xl animate-fade-in-up delay-100">
            مسيرة النور
          </h1>
          <p className="font-noto text-xl text-gray-300 animate-fade-in-up delay-200">
            Journey of Light
          </p>
        </div>
      </div>

      {/* --- 4. THE TIMELINE CONTAINER --- */}
      <div className="max-w-5xl mx-auto px-6 pb-32 relative">
        {/* The Golden Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-school-gold via-school-gold/50 to-transparent md:-translate-x-1/2 opacity-30"></div>

        <div className="space-y-24">
          {historyEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? "" : "md:flex-row-reverse"}`}
              >
                {/* Year Badge (Center Dot) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[0.55rem] md:-translate-x-1/2 w-5 h-5 rounded-full bg-school-gold border-4 border-school-dark z-20 shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>

                {/* Text Content */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                >
                  <span className="text-school-gold font-bold text-5xl font-amiri opacity-20 absolute -top-10 select-none">
                    {event.year}
                  </span>
                  <h2 className="text-3xl font-bold font-amiri text-white mb-2 relative z-10">
                    {event.title_ar}
                  </h2>
                  <h3 className="text-lg font-medium text-school-gold/80 mb-4 font-noto">
                    {event.title_en}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-noto text-sm">
                    {event.desc_ar}
                    <br />
                    <span className="block mt-2 opacity-70 italic">
                      {event.desc_en}
                    </span>
                  </p>
                </div>

                {/* Image Card (Full Color & Zoom) */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="relative h-64 w-full rounded-lg overflow-hidden border border-white/10 group shadow-2xl">
                    <Image
                      src={event.image}
                      alt={event.title_en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Subtle Golden Sheen on Hover */}
                    <div className="absolute inset-0 bg-school-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- 5. BOTTOM SECTION: FUTURE LEGACY --- */}
      <div className="relative py-24 bg-white/5 border-t border-school-gold/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/pattern.png')] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-amiri text-white mb-6">
            كن جزءاً من الحكاية
          </h2>
          <h3 className="text-xl text-school-gold mb-8 font-noto tracking-widest uppercase text-sm">
            Be Part of the Story
          </h3>
          <p className="text-gray-400 leading-relaxed mb-10 font-noto max-w-2xl mx-auto">
            لقد حافظ أجدادنا على هذا الإرث العظيم، والآن جاء دورنا لنحمل المشعل.
            مساهمتك اليوم تضمن استمرار هذه المنارة العلمية للأجيال القادمة.
            <br />
            <span className="block mt-4 text-sm opacity-60 italic">
              Our ancestors preserved this great legacy, and now it is our turn
              to carry the torch. Your contribution today ensures this beacon of
              knowledge continues for future generations.
            </span>
          </p>

          <Link
            href="/donate"
            className="inline-flex items-center gap-4 px-10 py-4 bg-school-gold text-school-dark font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]"
          >
            <span>ساهم في الوقف</span>
            <span className="text-xs uppercase opacity-70 border-l border-school-dark/20 pl-4 ml-2">
              Support the Waqf
            </span>
            <ArrowLeft className="rtl:hidden" size={20} />
            <ArrowRight className="ltr:hidden" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
