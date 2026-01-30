"use client";
import { useState } from "react";
import { Plus, Trash2, Video, User, Clock, Youtube } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { addCourse, deleteCourse } from "./actions";

export default function CoursesClient({ courses }: { courses: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [isFormOpen, setIsFormOpen] = useState(false);

  const t = {
    title: isAr ? "إدارة الدروس" : "Course Management",
    add_btn: isAr ? "إضافة درس جديد" : "Add New Course",
    empty: isAr ? "لا توجد دروس مضافة حالياً." : "No courses available.",

    // Form Labels
    lbl_title_ar: isAr ? "عنوان الدرس (عربي)" : "Title (Arabic)",
    lbl_title_en: isAr ? "عنوان الدرس (إنجليزي)" : "Title (English)",
    lbl_sheikh_ar: isAr ? "اسم الشيخ (عربي)" : "Sheikh Name (Arabic)",
    lbl_sheikh_en: isAr ? "اسم الشيخ (إنجليزي)" : "Sheikh Name (English)",
    lbl_cat: isAr ? "التصنيف" : "Category",
    lbl_url: isAr ? "رابط الفيديو" : "Video URL",
    lbl_duration: isAr ? "المدة" : "Duration",
    save: isAr ? "حفظ الدرس" : "Save Course",
    cancel: isAr ? "إلغاء" : "Cancel",

    // Headers
    h_lesson: isAr ? "الدرس" : "Lesson",
    h_sheikh: isAr ? "الشيخ" : "Sheikh",
    h_cat: isAr ? "التصنيف" : "Category",
    h_actions: isAr ? "إجراءات" : "Actions",
  };

  return (
    <div
      className={`space-y-6 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Header & Add Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 font-amiri">
          {t.title}{" "}
          <span className="text-gray-400 text-lg">({courses.length})</span>
        </h1>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-school-gold hover:bg-yellow-600 text-school-dark px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> {t.add_btn}
        </button>
      </div>

      {/* ADD COURSE FORM (Collapsible) */}
      {isFormOpen && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg animate-in fade-in slide-in-from-top-4">
          <form
            action={async (formData) => {
              await addCourse(formData);
              setIsFormOpen(false); // Close form after submit
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="title_ar"
                placeholder={t.lbl_title_ar}
                required
                className="input-field"
              />
              <input
                name="title_en"
                placeholder={t.lbl_title_en}
                required
                className="input-field"
                dir="ltr"
              />

              <input
                name="sheikh_ar"
                placeholder={t.lbl_sheikh_ar}
                required
                className="input-field"
              />
              <input
                name="sheikh_en"
                placeholder={t.lbl_sheikh_en}
                required
                className="input-field"
                dir="ltr"
              />

              <select name="category" className="input-field">
                <option value="Fiqh">Fiqh / فقه</option>
                <option value="Grammar">Grammar / نحو</option>
                <option value="Hadith">Hadith / حديث</option>
                <option value="Quran">Quran / قرآن</option>
              </select>
              <input
                name="duration"
                placeholder="e.g. 45 min"
                className="input-field"
                dir="ltr"
              />
            </div>

            <div className="mb-6">
              <input
                name="videoUrl"
                placeholder={t.lbl_url}
                required
                className="input-field"
                dir="ltr"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-bold"
              >
                {t.cancel}
              </button>
              <button className="bg-school-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-black">
                {t.save}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* COURSES TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {courses.length === 0 ? (
          <div className="p-12 text-center text-gray-500">{t.empty}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full ${isAr ? "text-right" : "text-left"}`}>
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">{t.h_lesson}</th>
                  <th className="px-6 py-4">{t.h_sheikh}</th>
                  <th className="px-6 py-4">{t.h_cat}</th>
                  <th className="px-6 py-4 text-center">{t.h_actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <Youtube size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {isAr ? course.title_ar : course.title_en}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={10} /> {course.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        {isAr ? course.sheikh_ar : course.sheikh_en}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <form action={deleteCourse}>
                        <input type="hidden" name="id" value={course.id} />
                        <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-field {
          @apply w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-school-gold focus:bg-white transition-all text-gray-800;
        }
      `}</style>
    </div>
  );
}
