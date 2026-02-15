"use client";
import { useState } from "react";
import {
  Plus,
  Trash2,
  Newspaper,
  User,
  Image as ImageIcon,
  Save,
  X,
  AlignLeft,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { addArticle, deleteArticle } from "../../../actions/cms";

export default function NewsClient({ articles }: { articles: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [isFormOpen, setIsFormOpen] = useState(false);

  const t = {
    title: isAr ? "أخبار و مقالات" : "News & Articles",
    add_btn: isAr ? "إضافة خبر" : "Add Article",
    empty: isAr ? "لا توجد مقالات." : "No articles yet.",
    save: isAr ? "نشر" : "Publish",
    cancel: isAr ? "إلغاء" : "Cancel",

    ph_title_ar: isAr ? "عنوان المقال (عربي)..." : "Article Title (Arabic)...",
    ph_title_en: isAr
      ? "عنوان المقال (إنجليزي)..."
      : "Article Title (English)...",
    ph_content_ar: isAr ? "نص المقال (عربي)..." : "Content (Arabic)...",
    ph_content_en: isAr ? "نص المقال (إنجليزي)..." : "Content (English)...",
    ph_author: isAr ? "الكاتب..." : "Author Name...",
    ph_image: isAr ? "رفع صورة الغلاف" : "Upload Cover Image",
  };

  return (
    <div
      className={`space-y-8 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-amiri">
            {t.title}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {articles?.length || 0} items
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${
            isFormOpen
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "bg-school-dark text-white hover:bg-black shadow-lg hover:scale-105"
          }`}
        >
          {isFormOpen ? <X size={20} /> : <Plus size={20} />}
          <span>{isFormOpen ? t.cancel : t.add_btn}</span>
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-gray-50/50 rounded-3xl p-8 animate-in fade-in slide-in-from-top-4 border border-dashed border-gray-200">
          <form
            action={async (formData) => {
              await addArticle(formData);
              setIsFormOpen(false);
            }}
          >
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft size={14} /> Arabic Content
                  </label>
                  <input
                    name="title_ar"
                    placeholder={t.ph_title_ar}
                    required
                    className="invisible-input text-2xl font-bold font-amiri"
                  />
                  <textarea
                    name="content_ar"
                    placeholder={t.ph_content_ar}
                    required
                    rows={6}
                    className="invisible-input text-base text-gray-600 resize-none font-amiri leading-relaxed"
                  />
                </div>
                <div className="space-y-4" dir="ltr">
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft size={14} /> English Content
                  </label>
                  <input
                    name="title_en"
                    placeholder={t.ph_title_en}
                    required
                    className="invisible-input text-2xl font-bold"
                  />
                  <textarea
                    name="content_en"
                    placeholder={t.ph_content_en}
                    required
                    rows={6}
                    className="invisible-input text-base text-gray-600 resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 pt-4 border-t border-gray-200/50 items-end">
                <div className="flex-1 w-full">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2">
                    <User size={16} /> Author
                  </label>
                  <input
                    name="author"
                    placeholder={t.ph_author}
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 focus:border-school-gold focus:outline-none text-sm"
                  />
                </div>

                <div className="flex-[2] w-full">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2">
                    <ImageIcon size={16} /> {t.ph_image}
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg p-3 focus:border-school-gold focus:outline-none text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-school-gold/10 file:text-school-gold hover:file:bg-school-gold/20 cursor-pointer"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="bg-school-gold hover:bg-yellow-500 text-school-dark px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                  <Save size={18} /> {t.save}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ADMIN ARTICLE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles?.map((article) => (
          <div
            key={article.id}
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all relative flex flex-col md:flex-row gap-6"
          >
            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <form action={deleteArticle}>
                <input type="hidden" name="id" value={article.id} />
                <button className="text-gray-300 hover:text-red-500 transition-colors bg-white rounded-full p-2 shadow-sm">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>

            {article.image && (
              <div className="w-full md:w-48 h-48 md:h-auto bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img
                  src={article.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-school-gold uppercase font-bold tracking-wider mb-2">
                <Newspaper size={14} />
                <span>News</span>
              </div>
              <h3 className="font-bold text-gray-900 text-xl leading-tight font-amiri mb-2">
                {isAr ? article.title_ar : article.title_en}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                {isAr ? article.content_ar : article.content_en}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 pt-4 border-t border-gray-50 mt-auto">
                <User size={14} />
                <span className="font-medium text-gray-600">
                  {article.author}
                </span>
                <span className="mx-2">•</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!articles || articles.length === 0) && !isFormOpen && (
        <div className="text-center py-20 opacity-50">
          <Newspaper size={48} className="mx-auto mb-4 text-gray-300" />
          <p>{t.empty}</p>
        </div>
      )}

      <style jsx>{`
        .invisible-input {
          @apply w-full bg-transparent border-b-2 border-transparent placeholder-gray-300 focus:outline-none focus:border-gray-200 transition-colors py-2;
        }
        .invisible-input:hover {
          @apply border-gray-100;
        }
      `}</style>
    </div>
  );
}
