"use client";
import { useState } from "react";
import { Plus, Trash2, Book, User, FileText, Upload, X } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { addBook, deleteBook } from "./actions";

export default function LibraryClient({ books }: { books: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Labels...
  const t = {
    title: isAr ? "إدارة المكتبة" : "Library Management",
    add_btn: isAr ? "إضافة كتاب جديد" : "Add New Book",
    save: isAr ? "حفظ" : "Save",
    cancel: isAr ? "إلغاء" : "Cancel",
    h_book: isAr ? "الكتاب" : "Book",
    h_actions: isAr ? "إجراءات" : "Actions",
  };

  return (
    <div
      className={`p-6 space-y-6 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 font-amiri">
          {t.title}
        </h1>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-school-gold px-4 py-2 rounded-xl font-bold flex items-center gap-2"
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}{" "}
          {isFormOpen ? t.cancel : t.add_btn}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white border p-6 rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-4">
          <form
            action={async (formData) => {
              setIsUploading(true);
              await addBook(formData);
              setIsUploading(false);
              setIsFormOpen(false);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="title_ar"
                placeholder="Title AR"
                required
                className="border p-3 rounded-xl w-full"
              />
              <input
                name="title_en"
                placeholder="Title EN"
                required
                className="border p-3 rounded-xl w-full"
                dir="ltr"
              />
              <input
                name="pdfFile"
                type="file"
                accept=".pdf"
                required
                className="w-full text-sm"
              />
              <input
                name="coverFile"
                type="file"
                accept="image/*"
                className="w-full text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                disabled={isUploading}
                className="bg-school-dark text-white px-8 py-2 rounded-lg font-bold"
              >
                {isUploading ? "..." : t.save}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-right">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">{t.h_book}</th>
              <th className="px-6 py-4 text-center">{t.h_actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-gray-100 rounded overflow-hidden border">
                      {/* Use coverUrl here */}
                      {book.coverUrl && (
                        <img
                          src={book.coverUrl}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span className="font-bold text-gray-800">
                      {isAr ? book.title_ar : book.title_en}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <form action={deleteBook}>
                    <input type="hidden" name="id" value={book.id} />
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
