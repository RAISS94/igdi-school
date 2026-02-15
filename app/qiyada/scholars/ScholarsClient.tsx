"use client";
import { useState } from "react";
import {
  Plus,
  Trash2,
  User,
  Image as ImageIcon,
  Save,
  X,
  AlignLeft,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { addScholar, deleteScholar } from "../../../actions/cms";

export default function ScholarsClient({ scholars }: { scholars: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [isFormOpen, setIsFormOpen] = useState(false);

  const t = {
    title: isAr ? "العلماء والشيوخ" : "Scholars & Teachers",
    add_btn: isAr ? "إضافة شيخ" : "Add Scholar",
    empty: isAr ? "لا توجد بيانات." : "No scholars yet.",
    save: isAr ? "حفظ" : "Save",
    cancel: isAr ? "إلغاء" : "Cancel",

    ph_name_ar: isAr ? "الاسم (عربي)..." : "Name (Arabic)...",
    ph_name_en: isAr ? "الاسم (إنجليزي)..." : "Name (English)...",
    ph_title_ar: isAr
      ? "اللقب (مثلاً: شيخ، دكتور)..."
      : "Title (e.g. Sheikh)...",
    ph_title_en: isAr ? "Title (e.g. Sheikh)..." : "Title (e.g. Sheikh)...",
    ph_bio_ar: isAr ? "نبذة مختصرة (عربي)..." : "Bio (Arabic)...",
    ph_bio_en: isAr ? "نبذة مختصرة (إنجليزي)..." : "Bio (English)...",
    ph_image: isAr ? "رفع صورة من الحاسوب" : "Upload Image from PC",
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
            {scholars?.length || 0} members
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
              await addScholar(formData);
              setIsFormOpen(false);
            }}
          >
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft size={14} /> Arabic Details
                  </label>
                  <input
                    name="name_ar"
                    placeholder={t.ph_name_ar}
                    required
                    className="invisible-input text-2xl font-bold font-amiri"
                  />
                  <input
                    name="title_ar"
                    placeholder={t.ph_title_ar}
                    required
                    className="invisible-input text-sm text-gray-500"
                  />
                  <textarea
                    name="bio_ar"
                    placeholder={t.ph_bio_ar}
                    required
                    rows={4}
                    className="invisible-input text-base text-gray-600 resize-none font-amiri leading-relaxed"
                  />
                </div>
                <div className="space-y-4" dir="ltr">
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft size={14} /> English Details
                  </label>
                  <input
                    name="name_en"
                    placeholder={t.ph_name_en}
                    required
                    className="invisible-input text-2xl font-bold"
                  />
                  <input
                    name="title_en"
                    placeholder={t.ph_title_en}
                    required
                    className="invisible-input text-sm text-gray-500"
                  />
                  <textarea
                    name="bio_en"
                    placeholder={t.ph_bio_en}
                    required
                    rows={4}
                    className="invisible-input text-base text-gray-600 resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* REAL IMAGE UPLOAD FIELD */}
              <div className="pt-4 border-t border-gray-200/50">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2">
                  <ImageIcon size={16} /> {t.ph_image}
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 focus:border-school-gold focus:outline-none text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-school-gold/10 file:text-school-gold hover:file:bg-school-gold/20 transition-all cursor-pointer"
                  dir="ltr"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-school-gold hover:bg-yellow-500 text-school-dark px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Save size={18} /> {t.save}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholars?.map((scholar) => (
          <div
            key={scholar.id}
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all relative flex flex-col items-center text-center"
          >
            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <form action={deleteScholar}>
                <input type="hidden" name="id" value={scholar.id} />
                <button className="text-gray-300 hover:text-red-500 transition-colors bg-white rounded-full p-2 shadow-sm">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>

            <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 overflow-hidden border-4 border-white shadow-md relative">
              {scholar.image ? (
                <img
                  src={scholar.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <User size={32} />
                </div>
              )}
            </div>

            <h3 className="font-bold text-gray-900 text-xl font-amiri mb-1">
              {isAr ? scholar.name_ar : scholar.name_en}
            </h3>
            <span className="text-xs font-bold text-school-gold uppercase tracking-widest mb-4 block">
              {isAr ? scholar.title_ar : scholar.title_en}
            </span>

            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
              {isAr ? scholar.bio_ar : scholar.bio_en}
            </p>
          </div>
        ))}

        {(!scholars || scholars.length === 0) && !isFormOpen && (
          <div className="col-span-full text-center py-20 text-gray-400">
            {t.empty}
          </div>
        )}
      </div>

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
