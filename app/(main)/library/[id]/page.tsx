"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Download,
  ArrowRight,
  ArrowLeft,
  Loader2,
  User,
  Tag,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { sanityClient } from "@/sanity/lib/client";

export default function BookDetailsPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const params = useParams();
  const id = params.id as string;

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "book" && _id == $id][0]{
            _id, title_ar, title_en, author_ar, author_en, category,
            desc_ar, desc_en,
            "coverUrl": coverImage.asset->url,
            "pdfUrl": coalesce(pdfFile.asset->url, externalPdfUrl)
          }`,
          { id },
        );
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBook();
  }, [id]);

  const t = {
    back: isAr ? "العودة للمكتبة" : "Back to Library",
    author: isAr ? "المؤلف" : "Author",
    category: isAr ? "التصنيف" : "Category",
    description: isAr ? "نبذة عن الكتاب" : "Description",
    read: isAr ? "قراءة / تحميل الكتاب" : "Read / Download the Book",
    notFound: isAr ? "لم يتم العثور على الكتاب." : "Book not found.",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <Loader2 className="text-school-gold animate-spin" size={40} />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-gray-400 font-amiri text-2xl">
        {t.notFound}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#0B1120] text-white pt-32 pb-24 font-noto ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-school-gold transition-colors mb-10 font-bold"
        >
          {isAr ? <ArrowRight size={20} /> : <ArrowLeft size={20} />} {t.back}
        </Link>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="relative aspect-[3/4] bg-[#1A202C] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={isAr ? book.title_ar : book.title_en}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-white/5">
                <BookOpen size={48} strokeWidth={1} />
              </div>
            )}
          </div>

          <div>
            <span className="inline-block px-4 py-1.5 bg-school-gold/10 text-school-gold text-xs font-bold uppercase tracking-wider rounded-lg mb-6 border border-school-gold/20 flex items-center gap-2 w-max">
              <Tag size={14} /> {book.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-amiri text-white mb-6 leading-tight font-bold">
              {isAr ? book.title_ar : book.title_en}
            </h1>

            <div className="flex items-center gap-3 text-gray-400 mb-10 pb-10 border-b border-white/10">
              <User size={20} className="text-school-gold" />
              <span className="text-lg">
                <span className="font-bold text-gray-300 mr-2 ml-2">
                  {t.author}:
                </span>
                {isAr ? book.author_ar : book.author_en}
              </span>
            </div>

            <h2 className="text-2xl font-amiri text-school-gold mb-4 font-bold">
              {t.description}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-10 whitespace-pre-wrap opacity-90">
              {isAr ? book.desc_ar : book.desc_en}
            </p>

            {book.pdfUrl && (
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto bg-school-gold text-school-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-xl shadow-school-gold/20"
              >
                <Download size={22} /> {t.read}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
