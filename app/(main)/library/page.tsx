"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Book, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type BookData = {
  id: string;
  _id?: string; // Adding Sanity's native ID just in case
  title_ar: string;
  title_en: string;
  author_ar: string;
  author_en: string;
  category: string;
  coverUrl: string | null;
  pdfUrl: string;
};

export default function LibraryPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const t = {
    badge: isAr ? "المكتبة الرقمية" : "Digital Library",
    title: isAr ? "المتون العلمية والكتب المنهجية" : "Scientific Texts & Books",
    subtitle: isAr
      ? "مجموعة مختارة من المصادر والمراجع العلمية متاحة للتحميل مجاناً لطلبة العلم."
      : "A curated collection of scientific resources available for free download.",
    empty: isAr
      ? "لا توجد كتب مضافة في المكتبة حالياً."
      : "No books available in the library yet.",
    viewDetails: isAr ? "عرض التفاصيل" : "View Details",
    no_cover: isAr ? "بدون غلاف" : "No Cover",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <Loader2 className="text-school-gold animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#0B1120] text-white pt-32 pb-24 font-noto ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-school-gold/10 text-school-gold border border-school-gold/20 mb-6 font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <BookOpen size={16} /> {t.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-amiri text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7CE] via-[#D4AF37] to-[#B8860B] mb-6 drop-shadow-sm leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-[#1A202C]/50 rounded-3xl border border-white/10 border-dashed">
              <p className="text-gray-400 font-amiri text-xl">{t.empty}</p>
            </div>
          ) : (
            books.map((book) => {
              const bookId = book.id || book._id;
              return (
                <Link
                  key={bookId}
                  href={`/library/${bookId}`}
                  className="group bg-[#1A202C] border border-white/5 rounded-2xl p-4 hover:border-school-gold/50 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300 hover:-translate-y-2 block"
                >
                  <div className="relative aspect-[3/4] bg-black/40 rounded-xl overflow-hidden mb-4 border border-white/5 shadow-inner">
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={isAr ? book.title_ar : book.title_en}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-white/5 gap-2">
                        <Book size={32} strokeWidth={1} />
                        <span className="text-[10px] uppercase tracking-widest">
                          {t.no_cover}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    <div className="absolute inset-0 bg-school-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-school-gold text-school-dark px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                        {isAr ? (
                          <ArrowLeft size={14} />
                        ) : (
                          <ArrowRight size={14} />
                        )}{" "}
                        {t.viewDetails}
                      </span>
                    </div>
                  </div>

                  <div className="text-center px-1">
                    <span className="inline-block px-2 py-0.5 bg-school-gold/10 text-school-gold text-[9px] font-bold uppercase tracking-wider rounded mb-2 border border-school-gold/20">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-gray-100 mb-1 line-clamp-1 font-amiri text-lg group-hover:text-school-gold transition-colors">
                      {isAr ? book.title_ar : book.title_en}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 font-mono group-hover:text-gray-400 transition-colors">
                      {isAr ? book.author_ar : book.author_en}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
