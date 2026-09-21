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
import { useLanguage } from "@/context/LanguageContext";
import {
  addCourse,
  deleteCourse,
  updateCourse, // Make sure this is exported from actions.ts
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
  const [editingCourse, setEditingCourse] = useState<any>(null); // Tracks the course being edited

  const [isCreatingCat, setIsCreatingCat] = useState(false);
  const [isManagingCats, setIsManagingCats] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const t = {
    title: isAr ? "إدارة الدروس" : "Course Management",
    add_btn: isAr ? "إضافة درس" : "Add Course",
    edit_btn: isAr ? "تعديل الدرس" : "Edit Course",
    empty: isAr ? "لا توجد دروس." : "No courses yet.",
    save: isAr ? "حفظ" : "Save",
    cancel: isAr ? "إلغاء" : "Cancel",
    manage: isAr ? "إدارة الفلاتر" : "Manage Filters",

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

  function handleEditClick(course: any) {
    setEditingCourse(course);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelForm() {
    setIsFormOpen(false);
    setEditingCourse(null);
  }

  // Parse existing duration for the edit form
  const durMatch = editingCourse?.duration?.match(/(\d+)h\s*(\d+)m/);
  const defaultH = durMatch ? durMatch[1] : "0";
  const defaultM = durMatch ? durMatch[2] : "0";

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
          onClick={() =>
            isFormOpen ? handleCancelForm() : setIsFormOpen(true)
          }
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
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200 mb-10 animate-in fade-in slide-in-from-top-4">
          <form
            key={editingCourse?.id || "new"}
            action={async (formData) => {
              if (editingCourse) {
                formData.append("id", editingCourse.id);
                await updateCourse(formData);
              } else {
                await addCourse(formData);
              }
              handleCancelForm();
            }}
          >
            <div className="space-y-8 max-w-5xl mx-auto">
              {editingCourse && (
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm mb-4 inline-block">
                  {t.edit_btn}:{" "}
                  {isAr ? editingCourse.title_ar : editingCourse.title_en}
                </div>
              )}

              {/* Titles & Descriptions - Fixed overlapping by using rigid cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Arabic Card (Strict RTL) */}
                <div
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4 shadow-inner"
                  dir="rtl"
                >
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2 mb-2">
                    <AlignLeft size={14} /> Arabic Details
                  </label>
                  <input
                    name="title_ar"
                    defaultValue={editingCourse?.title_ar}
                    placeholder={t.ph_title_ar}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-amiri font-bold text-lg focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors"
                  />
                  <input
                    name="sheikh_ar"
                    defaultValue={editingCourse?.sheikh_ar}
                    placeholder={t.ph_sheikh_ar}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-amiri text-sm focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors"
                  />
                  <textarea
                    name="description_ar"
                    defaultValue={editingCourse?.description_ar}
                    placeholder={t.ph_desc_ar}
                    rows={3}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-amiri text-sm resize-none focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors"
                  />
                </div>

                {/* English Card (Strict LTR) */}
                <div
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4 shadow-inner"
                  dir="ltr"
                >
                  <label className="text-xs font-bold text-school-gold uppercase tracking-wider flex items-center gap-2 mb-2">
                    <AlignLeft size={14} /> English Details
                  </label>
                  <input
                    name="title_en"
                    defaultValue={editingCourse?.title_en}
                    placeholder={t.ph_title_en}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors"
                  />
                  <input
                    name="sheikh_en"
                    defaultValue={editingCourse?.sheikh_en}
                    placeholder={t.ph_sheikh_en}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors"
                  />
                  <textarea
                    name="description_en"
                    defaultValue={editingCourse?.description_en}
                    placeholder={t.ph_desc_en}
                    rows={3}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors"
                  />
                </div>
              </div>

              {/* Metadata Row */}
              <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-gray-100">
                {/* CATEGORY MANAGER */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-500">
                      <Filter size={16} /> {t.lbl_cat}
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsManagingCats(!isManagingCats)}
                      className="text-xs text-gray-400 hover:text-school-gold flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-200"
                    >
                      <Settings size={12} /> {t.manage}
                    </button>
                  </div>

                  {isManagingCats ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto shadow-inner">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between text-sm group bg-white px-3 py-2 rounded-lg border border-gray-100"
                        >
                          {editingCatId === cat.id ? (
                            <div className="flex items-center gap-2 w-full">
                              <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border rounded px-2 py-1 text-xs w-full focus:outline-none focus:border-school-gold"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateCategory(cat.id)}
                                className="text-green-600 hover:bg-green-50 p-1 rounded"
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
                                  className="text-blue-400 hover:text-blue-600 p-1 hover:bg-blue-50 rounded"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteCategory(cat.id)}
                                  className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      {categories.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-2">
                          No filters yet
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      {!isCreatingCat ? (
                        <div className="flex gap-3">
                          <select
                            name="category"
                            defaultValue={editingCourse?.category}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-school-gold font-medium text-gray-700"
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
                            className="text-xs bg-school-dark text-white px-4 rounded-xl hover:bg-black font-bold whitespace-nowrap transition-colors"
                          >
                            {t.create_cat}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 animate-in fade-in bg-gray-50 p-2 rounded-xl border border-gray-200">
                          <input
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Name..."
                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-school-gold flex-1"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleCreateCategory}
                            className="text-white bg-green-500 p-2 hover:bg-green-600 rounded-lg transition-colors"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsCreatingCat(false)}
                            className="text-white bg-red-500 p-2 hover:bg-red-600 rounded-lg transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3">
                    <Clock size={16} /> {t.lbl_duration}
                  </label>
                  <div
                    className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-2 w-max"
                    dir="ltr"
                  >
                    <div className="relative">
                      <input
                        type="number"
                        name="duration_h"
                        min="0"
                        max="10"
                        defaultValue={defaultH}
                        className="w-16 p-2 bg-white border border-gray-200 rounded-lg text-center font-mono font-bold focus:border-school-gold outline-none"
                      />
                      <span className="absolute right-1 top-2 text-xs text-gray-400 pointer-events-none">
                        h
                      </span>
                    </div>
                    <span className="font-bold text-gray-400">:</span>
                    <div className="relative">
                      <input
                        type="number"
                        name="duration_m"
                        min="0"
                        max="59"
                        defaultValue={defaultM}
                        className="w-16 p-2 bg-white border border-gray-200 rounded-lg text-center font-mono font-bold focus:border-school-gold outline-none"
                      />
                      <span className="absolute right-1 top-2 text-xs text-gray-400 pointer-events-none">
                        m
                      </span>
                    </div>
                  </div>
                </div>

                {/* URL */}
                <div className="flex-[2]">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-3">
                    <Youtube size={16} /> URL
                  </label>
                  <input
                    name="videoUrl"
                    defaultValue={editingCourse?.videoUrl}
                    placeholder={t.ph_url}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-school-gold focus:bg-white focus:outline-none font-mono text-sm text-blue-600 transition-colors"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <button className="bg-school-gold hover:bg-yellow-500 text-school-dark px-10 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-lg">
                  <Save size={20} /> {t.save}
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
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-school-gold/30 transition-all relative flex flex-col h-full"
          >
            {/* Edit and Delete Buttons overlay */}
            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-2">
              <button
                onClick={() => handleEditClick(course)}
                className="text-gray-400 hover:text-blue-500 transition-colors bg-white rounded-full p-1.5 shadow-sm border border-gray-100"
              >
                <Edit2 size={16} />
              </button>
              <form action={deleteCourse}>
                <input type="hidden" name="id" value={course.id} />
                <button className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>

            <div className="flex items-start justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-school-gold bg-school-gold/10 px-3 py-1.5 rounded-full border border-school-gold/20">
                {course.category}
              </span>
              <span className="text-xs text-gray-400 font-mono flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                <Clock size={12} /> {course.duration}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 text-xl leading-snug font-amiri mb-3 group-hover:text-school-gold transition-colors pr-16 rtl:pl-16 rtl:pr-0">
              {isAr ? course.title_ar : course.title_en}
            </h3>

            <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
              {isAr ? course.description_ar : course.description_en}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
              <User size={14} className="text-school-gold" />
              <span className="font-bold text-gray-700">
                {isAr ? course.sheikh_ar : course.sheikh_en}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
