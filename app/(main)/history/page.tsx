"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, History, X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// --- CONTENT DATA ---
const historyEvents = [
  {
    year: "01",
    title_ar: "من نحن",
    title_en: "Who We Are",
    desc_ar:
      "مدرسة إيكضي العتيقة مؤسسة علمية قرآنية راسخة الجذور بقبيلة أسيف أودرار، جماعة ايت اسفن، بإقليم تيزنيت، تُعنى بتحفيظ القرآن الكريم وتعليم العلوم الشرعية وفق المنهج العتيق الذي عُرفت به مدارس سوس العلمية العتيقة. وقد ظلت المدرسة، منذ تأسيسها، منارةً للعلم والتربية، ومركزًا لتكوين حفظة القرآن وطلبة العلم، مساهمةً في ترسيخ القيم الدينية والأخلاقية، وخدمة المجتمع المحلي في ارتباط وثيق بثوابته الدينية والوطنية.",
    desc_en:
      "Igdi Traditional School is a deeply rooted Quranic scientific institution in the Asif Ouderar tribe, Ait Isafen community, Tiznit province. It is dedicated to memorizing the Holy Quran and teaching Sharia sciences according to the traditional methodology known in the Sous scientific schools. Since its foundation, the school has remained a beacon of knowledge and education, a center for training Quran memorizers and students of knowledge, contributing to establishing religious and moral values and serving the local community in close connection with its religious and national constants.",
    image: "/story1.jpeg",
  },
  {
    year: "07 AH",
    title_ar: "التاريخ",
    title_en: "History",
    desc_ar:
      "تندرج مدرسة إيكضي ضمن سلسلة المدارس العتيقة التي نشأت استجابةً لحاجة المجتمع المحلي إلى حفظ القرآن الكريم ونشر العلوم الشرعية. وقد أسهمت، عبر مسيرتها العلمية، في تخريج عدد من العلماء والفقهاء وحفظة القرآن، الذين اضطلعوا بأدوار تعليمية ودعوية داخل المنطقة وخارجها. ويمثل تاريخ المدرسة جزءًا من الذاكرة العلمية للتراث السوسي، وهو تاريخ يحتاج إلى مزيد من البحث والتوثيق لاستجلاء مختلف مراحله وإبراز مكانته ضمن الحركة العلمية بالجنوب المغربي. وتأسيس مدرسة إيكضي قديم يقال إنها مبنية في القرن السابع الهجري 7هـ.",
    desc_en:
      "Igdi School falls within the chain of traditional schools that emerged in response to the local community's need to memorize the Holy Quran and spread Sharia sciences. Throughout its scientific journey, it has contributed to graduating a number of scholars, jurists, and Quran memorizers who have taken on educational and advocacy roles within and outside the region. The school's history represents part of the scientific memory of the Sous heritage, a history that needs further research to clarify its various stages. The founding of Igdi School is ancient, said to be built in the 7th Hijri century (7 AH).",
    image: "/story2.jpg",
  },
  {
    year: "Loc",
    title_ar: "الموقع",
    title_en: "Location",
    desc_ar:
      "تقع مدرسة إيكضي بقبيلة أسيف أودرار، التابعة لجماعة أيت إيسافن بإقليم تيزنيت، على مسافة تقارب 60 كيلومترًا من مدينة تيزنيت في اتجاه أنزي. وتتميز المدرسة بموقع جغرافي هادئ تحيط به الهضاب والمرتفعات، ويشرف عليها كل من جبل تازكا جنوبًا وجبل تاماترت شمالًا، مما وفر بيئة مناسبة للتحصيل العلمي، والانقطاع للقرآن وطلب العلم.",
    desc_en:
      "Igdi School is located in the Asif Ouderar tribe, affiliated with the Ait Isafen community in Tiznit province, approximately 60 kilometers from the city of Tiznit in the direction of Anzi. The school features a quiet geographic location surrounded by plateaus and highlands, overlooked by Mount Tazka to the south and Mount Tamatert to the north, providing a suitable environment for academic achievement and dedication to the Quran and seeking knowledge.",
    image: "/story3.jpeg",
  },
  {
    year: "Goal",
    title_ar: "الرسالة",
    title_en: "Mission",
    desc_ar:
      "تسعى مدرسة إيكضي إلى الإسهام في حفظ القرآن الكريم وتكوين جيل متشبّع بقيم الإسلام الوسطية، متسلّح بالعلم الشرعي، ومؤهّل لخدمة دينه ووطنه. كما تهدف المدرسة إلى صيانة التراث العلمي العتيق، وترسيخ مكانة القرآن في المجتمع، وتعزيز الشراكة مع المحيط المحلي في إطار من المسؤولية والتكافل، خدمةً للعلم وأهله.",
    desc_en:
      "Igdi School seeks to contribute to the memorization of the Holy Quran and form a generation imbued with the values of moderate Islam, armed with Sharia knowledge, and qualified to serve their religion and country. The school also aims to preserve the ancient scientific heritage, establish the status of the Quran in society, and enhance partnership with the local surroundings within a framework of responsibility and solidarity, serving knowledge and its people.",
    image: "/story4.jpeg",
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
            src="/igdi-history-bg.jpg"
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
                // CHANGED: items-center replaced with items-stretch to match heights
                className={`relative flex flex-col md:flex-row items-stretch gap-12 ${isEven ? "" : "md:flex-row-reverse"}`}
              >
                {/* Year Badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[0.45rem] md:-translate-x-1/2 w-4 h-4 rounded-full bg-school-gold border-4 border-[#0B1120] z-20 shadow-[0_0_20px_rgba(212,175,55,1)]">
                  <div className="absolute inset-0 bg-school-gold rounded-full animate-ping opacity-20" />
                </div>

                {/* TEXT CARD */}
                <div
                  // CHANGED: Added flex flex-col justify-center to properly center the text box
                  className={`w-full md:w-1/2 pl-12 md:pl-0 flex flex-col justify-center ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
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
                  // CHANGED: Added flex flex-col to wrap the stretching child properly
                  className={`w-full md:w-1/2 pl-12 md:pl-0 flex flex-col ${isEven ? "md:pl-8" : "md:pr-8"}`}
                >
                  <div
                    onClick={() => setSelectedImage(event.image)}
                    // CHANGED: Removed md:h-80. Added h-64 md:h-auto and flex-1 so it stretches vertically
                    className="relative h-64 md:h-auto flex-1 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
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
