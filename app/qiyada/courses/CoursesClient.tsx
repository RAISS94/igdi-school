"use client";
import { useState } from "react";
import {
  Plus,
  Trash2,
  Youtube,
  Clock,
  User,
  Filter,
  Save,
  X,
  AlignLeft,
  Settings,
  Edit2,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import {
  addCourse,
  deleteCourse,
  addCategory,
  deleteCategory,
  updateCategory,
} from "./actions";

export default function CoursesClient({
  courses,
  categories,
}: {
  courses: any[];
  categories: any[];
}) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreatingCat, setIsCreatingCat] = useState(false);
  const [isManagingCats, setIsManagingCats] = useState(false); // Toggle for Manager Mode
  const [newCatName, setNewCatName] = useState("");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const t = {
    title: isAr ? "إدارة الدروس" : "Course Management",
    add_btn: isAr ? "إضافة درس" : "Add Course",
    empty: isAr ? "لا توجد دروس." : "No courses yet.",
    save: isAr ? "حفظ" : "Save",
    cancel: isAr ? "إلغاء" : "Cancel",
    manage: isAr ? "إدارة الفلاتر" : "Manage Filters",

    // Placeholders
    ph_title_ar: isAr ? "عنوان الدرس (عربي)..." : "Course Title (Arabic)...",
    ph_title_en: isAr
      ? "عنوان الدرس (إنجليزي)..."
      : "Course Title (English)...",
    ph_desc_ar: isAr ? "وصف الدرس (عربي)..." : "Description (Arabic)...",
    ph_desc_en: isAr ? "وصف الدرس (إنجليزي)..." : "Description (English)...",
    ph_sheikh_ar: isAr ? "الشيخ (عربي)..." : "Sheikh Name (Arabic)...",
    ph_sheikh_en: isAr ? "الشيخ (إنجليزي)..." : "Sheikh Name (English)...",
    ph_url: isAr ? "رابط الفيديو (YouTube)..." : "Video URL (YouTube)...",

    lbl_duration: isAr ? "المدة:" : "Duration:",
    lbl_cat: isAr ? "التصنيف:" : "Category:",
    create_cat: isAr ? "+ فلتر جديد" : "+ New Filter",
    no_cat: isAr ? "القائمة فارغة" : "List is empty",
  };

  async function handleCreateCategory() {
    if (!newCatName) return;
    await addCategory(newCatName);
    setNewCatName("");
    setIsCreatingCat(false);
  }

  async function handleUpdateCategory(id: string) {
    if (!editName) return;
    await updateCategory(id, editName);
    setEditingCatId(null);
  }

  return (
    <div
      className={`space-y-8 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-amiri">
            {t.title}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">{courses.length} items</p>
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

      {/* --- FORM AREA --- */}
      {isFormOpen && (
        <div className="bg-gray-50/50 rounded-3xl p-8 animate-in fade-in slide-in-from-top-4 border border-dashed border-gray-200">
          <form
            action={async (formData) => {
              await addCourse(formData);
              setIsFormOpen(false);
            }}
          >
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Titles & Descriptions */}
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft size={14} /> Arabic Details
                  </label>
                  <input
                    name="title_ar"
                    placeholder={t.ph_title_ar}
                    required
                    className="invisible-input text-2xl font-bold font-amiri"
                  />
                  <input
                    name="sheikh_ar"
                    placeholder={t.ph_sheikh_ar}
                    required
                    className="invisible-input text-sm text-gray-600"
                  />
                  <textarea
                    name="description_ar"
                    placeholder={t.ph_desc_ar}
                    rows={3}
                    className="invisible-input text-base text-gray-600 resize-none font-amiri"
                  />
                </div>
                <div className="space-y-4" dir="ltr">
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft size={14} /> English Details
                  </label>
                  <input
                    name="title_en"
                    placeholder={t.ph_title_en}
                    required
                    className="invisible-input text-2xl font-bold"
                  />
                  <input
                    name="sheikh_en"
                    placeholder={t.ph_sheikh_en}
                    required
                    className="invisible-input text-sm text-gray-600"
                  />
                  <textarea
                    name="description_en"
                    placeholder={t.ph_desc_en}
                    rows={3}
                    className="invisible-input text-base text-gray-600 resize-none"
                  />
                </div>
              </div>

              {/* Metadata Row */}
              <div className="flex flex-col md:flex-row gap-8 pt-4 border-t border-gray-200/50">
                {/* CATEGORY MANAGER */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400">
                      <Filter size={16} /> {t.lbl_cat}
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsManagingCats(!isManagingCats)}
                      className="text-xs text-gray-400 hover:text-school-gold flex items-center gap-1"
                    >
                      <Settings size={12} /> {t.manage}
                    </button>
                  </div>

                  {/* Manager Mode */}
                  {isManagingCats ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto shadow-sm">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between text-sm group"
                        >
                          {editingCatId === cat.id ? (
                            <div className="flex items-center gap-1 w-full">
                              <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border rounded px-1 py-0.5 text-xs w-full"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateCategory(cat.id)}
                                className="text-green-600"
                              >
                                <Save size={14} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span className="font-medium text-gray-700">
                                {cat.name}
                              </span>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCatId(cat.id);
                                    setEditName(cat.name);
                                  }}
                                  className="text-blue-400 hover:text-blue-600"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteCategory(cat.id)}
                                  className="text-gray-300 hover:text-red-500"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      {categories.length === 0 && (
                        <p className="text-xs text-gray-400 text-center">
                          No filters yet
                        </p>
                      )}
                    </div>
                  ) : (
                    // Normal Select Mode
                    <div className="relative">
                      {!isCreatingCat ? (
                        <div className="flex gap-2">
                          <select
                            name="category"
                            className="bg-transparent border-b border-gray-300 py-2 w-full focus:outline-none focus:border-school-gold font-medium text-gray-700"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => setIsCreatingCat(true)}
                            className="text-xs bg-gray-200 px-3 rounded hover:bg-gray-300 text-gray-600 whitespace-nowrap"
                          >
                            {t.create_cat}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 animate-in fade-in">
                          <input
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Name..."
                            className="bg-white border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-school-gold"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleCreateCategory}
                            className="text-green-600 p-1 hover:bg-green-50 rounded"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsCreatingCat(false)}
                            className="text-red-500 p-1 hover:bg-red-50 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Time & URL Sections (Same as before) */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2">
                    <Clock size={16} /> {t.lbl_duration}
                  </label>
                  <div className="flex items-center gap-2" dir="ltr">
                    <div className="relative">
                      <input
                        type="number"
                        name="duration_h"
                        min="0"
                        max="10"
                        defaultValue="0"
                        className="w-16 p-2 bg-white border border-gray-200 rounded-lg text-center font-mono font-bold focus:ring-2 focus:ring-school-gold outline-none"
                      />
                      <span className="absolute right-1 top-2 text-xs text-gray-400 pointer-events-none">
                        h
                      </span>
                    </div>
                    <span className="font-bold text-gray-300">:</span>
                    <div className="relative">
                      <input
                        type="number"
                        name="duration_m"
                        min="0"
                        max="59"
                        defaultValue="0"
                        className="w-16 p-2 bg-white border border-gray-200 rounded-lg text-center font-mono font-bold focus:ring-2 focus:ring-school-gold outline-none"
                      />
                      <span className="absolute right-1 top-2 text-xs text-gray-400 pointer-events-none">
                        m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-[2]">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-2">
                    <Youtube size={16} /> URL
                  </label>
                  <input
                    name="videoUrl"
                    placeholder={t.ph_url}
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-school-gold focus:outline-none font-mono text-sm text-blue-600"
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

      {/* --- COURSE LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all relative"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <form action={deleteCourse}>
                <input type="hidden" name="id" value={course.id} />
                <button className="text-gray-300 hover:text-red-500 transition-colors bg-white rounded-full p-1">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>

            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-school-gold bg-school-gold/10 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Clock size={12} /> {course.duration}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-xl leading-tight font-amiri mb-2">
                {isAr ? course.title_ar : course.title_en}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                {isAr ? course.description_ar : course.description_en}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 pt-4 border-t border-gray-50 mt-auto">
                <User size={14} />{" "}
                <span className="font-medium text-gray-600">
                  {isAr ? course.sheikh_ar : course.sheikh_en}
                </span>
              </div>
            </div>
          </div>
        ))}
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
