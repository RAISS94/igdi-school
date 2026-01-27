"use client";
import { useState } from "react";
import { BookOpen, Search, Download, Filter, X } from "lucide-react";
import { libraryItems } from "../../data/libraryData";
import { useLanguage } from "../../context/LanguageContext";
import { jsPDF } from "jspdf"; // <--- Import jsPDF

export default function LibraryPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const t = {
    title: isAr ? "المكتبة الرقمية" : "Digital Library",
    subtitle: isAr
      ? "بيت الحكمة: تصفح مجموعتنا المختارة من المصادر العلمية"
      : "House of Wisdom: Explore our curated collection of texts.",
    searchPlaceholder: isAr
      ? "ابحث عن كتاب، مؤلف..."
      : "Search for books, authors...",
    archiveLabel: isAr ? "الأرشيف الرقمي" : "Digital Archives",
    download: isAr ? "تحميل البطاقة" : "Download Card", // Changed text slightly to be accurate
    by: isAr ? "تأليف:" : "By:",
    noResults: isAr
      ? "لا توجد نتائج تطابق بحثك"
      : "No results match your search",
  };

  const categories = [
    { id: "All", ar: "جميع الكتب", en: "All Books" },
    { id: "Fiqh", ar: "الفقه", en: "Fiqh" },
    { id: "Grammar", ar: "النحو", en: "Grammar" },
    { id: "Hadith", ar: "الحديث", en: "Hadith" },
    { id: "Tafsir", ar: "التفسير", en: "Tafsir" },
    { id: "Seerah", ar: "السيرة", en: "Seerah" },
  ];

  // --- PDF GENERATION LOGIC ---
  const handleDownload = (book: (typeof libraryItems)[0]) => {
    const doc = new jsPDF();

    // 1. Header (School Name)
    doc.setTextColor(212, 175, 55); // School Gold Color
    doc.setFontSize(22);
    doc.text("IGDI School Library", 105, 20, { align: "center" });

    // 2. Divider Line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);

    // 3. Book Details (English Only for safety as Arabic requires custom fonts)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Category: ${book.category}`, 20, 40);

    doc.setFontSize(24);
    doc.setTextColor(42, 82, 152); // School Blue
    doc.text(book.title_en, 20, 55);

    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text(`Author: ${book.author_en}`, 20, 65);

    // 4. Description Box
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    // splitTextToSize wraps text so it doesn't go off the page
    const splitDesc = doc.splitTextToSize(book.desc_en, 170);
    doc.text(splitDesc, 20, 85);

    // 5. Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated from igdi-school.ma", 105, 280, { align: "center" });

    // 6. Save File
    doc.save(`${book.title_en.replace(/\s+/g, "_")}_IGDI_Card.pdf`);
  };

  // --- FILTERING LOGIC ---
  const filteredBooks = libraryItems.filter((book) => {
    const categoryMatch =
      selectedCategory === "All" || book.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const searchMatch =
      book.title_en.toLowerCase().includes(q) ||
      book.title_ar.includes(q) ||
      book.author_en.toLowerCase().includes(q) ||
      book.author_ar.includes(q);
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-school-dark text-white pt-24 pb-24">
      {/* Page Hero */}
      <div className="relative py-20 px-6 text-center border-b border-white/10 mb-16 bg-gradient-to-b from-school-dark to-[#111c2e]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-school-gold text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen size={14} />
            <span>{t.archiveLabel}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-amiri text-white drop-shadow-xl">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400 font-noto max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8 relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pl-12 rtl:pl-6 rtl:pr-12 text-white focus:outline-none focus:border-school-gold focus:bg-white/10 transition-all placeholder:text-gray-600 font-noto"
            />
            <Search
              className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-school-gold transition-colors"
              size={20}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full border text-sm font-bold font-noto transition-all ${
                selectedCategory === cat.id
                  ? "bg-school-gold text-school-dark border-school-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "border-white/10 hover:border-school-gold hover:text-school-gold text-gray-400 bg-white/5"
              }`}
            >
              {isAr ? cat.ar : cat.en}
            </button>
          ))}
        </div>

        <div className="mt-4 text-gray-500 text-sm font-noto">
          {isAr
            ? `عرض ${filteredBooks.length} كتاب`
            : `Showing ${filteredBooks.length} books`}
        </div>
      </div>

      {/* Filtered Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group relative bg-[#152033] border border-white/5 rounded-xl overflow-hidden hover:border-school-gold/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            >
              {/* Header */}
              <div className="h-32 bg-gradient-to-b from-white/5 to-transparent p-6 flex justify-between items-start relative">
                <div className="bg-school-gold/20 text-school-gold px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                  {book.category}
                </div>
                <BookOpen
                  className="absolute -bottom-4 right-4 text-white/5 rotate-12"
                  size={100}
                />
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="w-16 h-16 -mt-14 mb-4 bg-school-gold rounded-xl shadow-xl flex items-center justify-center text-school-dark relative z-10 border-4 border-[#152033]">
                  <BookOpen size={28} />
                </div>

                <h3 className="text-2xl font-bold font-amiri text-white mb-1 group-hover:text-school-gold transition-colors">
                  {isAr ? book.title_ar : book.title_en}
                </h3>
                <p className="text-sm text-gray-400 mb-4 font-noto">
                  {isAr ? book.desc_ar : book.desc_en}
                </p>

                <div className="h-px w-full bg-white/5 my-4" />

                <div className="flex justify-between items-center text-xs text-gray-500 mb-6 font-noto">
                  <span>
                    {t.by}{" "}
                    <span className="text-gray-300">
                      {isAr ? book.author_ar : book.author_en}
                    </span>
                  </span>
                  <span className="bg-white/5 px-2 py-1 rounded">Card</span>
                </div>

                {/* --- DOWNLOAD BUTTON ATTACHED HERE --- */}
                <button
                  onClick={() => handleDownload(book)} // <--- Connected!
                  className="w-full py-3 border border-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-school-gold hover:text-school-dark hover:border-school-gold transition-all font-bold text-sm"
                >
                  <Download size={16} />
                  {t.download}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
            <Search size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl text-white font-bold font-amiri mb-2">
              {t.noResults}
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 text-school-gold hover:underline text-sm font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
