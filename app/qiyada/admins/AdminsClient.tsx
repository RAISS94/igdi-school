"use client";
import { useState } from "react";
import { Plus, Trash2, Shield, Check, X, Lock, Mail } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { addAdmin, deleteAdmin } from "../../../actions/cms";

export default function AdminsClient({ admins }: { admins: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [isFormOpen, setIsFormOpen] = useState(false);

  // These IDs must match the 'id' fields in your Sidebar (layout.tsx)
  const availablePages = [
    { id: "dashboard", label: isAr ? "لوحة القيادة" : "Dashboard" },
    { id: "registrations", label: isAr ? "التسجيلات" : "Registrations" },
    { id: "courses", label: isAr ? "الدروس" : "Courses" },
    { id: "news", label: isAr ? "الأخبار" : "News" },
    { id: "scholars", label: isAr ? "العلماء" : "Scholars" },
    { id: "library", label: isAr ? "المكتبة" : "Library" },
    { id: "messages", label: isAr ? "الرسائل" : "Messages" },
    { id: "admins", label: isAr ? "إدارة المشرفين" : "Admin Management" },
  ];

  return (
    <div
      className={`space-y-8 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-amiri">
            Admin Management
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {admins.length} active users
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
          <span>{isFormOpen ? "Cancel" : "Add Admin"}</span>
        </button>
      </div>

      {/* --- ADD ADMIN FORM --- */}
      {isFormOpen && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl animate-in fade-in slide-in-from-top-4">
          <form
            action={async (formData) => {
              await addAdmin(formData);
              setIsFormOpen(false);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Full Name
                </label>
                <input
                  name="name"
                  placeholder="Ex: Ahmed Ali"
                  required
                  className="input-field"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email@domain.com"
                  required
                  className="input-field"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="input-field"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Role
                </label>
                <select name="role" className="input-field">
                  <option value="editor">Editor (Restricted)</option>
                  <option value="super_admin">Super Admin (Full Access)</option>
                </select>
              </div>
            </div>

            {/* Permissions Grid */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
              <label className="block text-sm font-bold text-school-dark mb-4 flex items-center gap-2">
                <Lock size={16} /> Access Permissions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availablePages.map((page) => (
                  <label
                    key={page.id}
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-school-gold cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="permissions"
                      value={page.id}
                      className="w-4 h-4 accent-school-gold"
                      defaultChecked={page.id === "dashboard"}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {page.label}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                * Super Admins bypass these checks automatically.
              </p>
            </div>

            <div className="flex justify-end">
              <button className="bg-school-gold text-school-dark px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-yellow-500 transition-colors">
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- ADMINS LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative group hover:shadow-md transition-all"
          >
            {/* Delete Button */}
            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <form action={deleteAdmin}>
                <input type="hidden" name="id" value={admin.id} />
                <button className="text-red-500 bg-red-50 p-2 rounded-full hover:bg-red-100">
                  <Trash2 size={16} />
                </button>
              </form>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                  admin.role === "super_admin"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {admin.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {admin.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Mail size={10} /> {admin.email}
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Shield
                size={14}
                className={
                  admin.role === "super_admin"
                    ? "text-purple-600"
                    : "text-blue-500"
                }
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                  admin.role === "super_admin"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {admin.role.replace("_", " ")}
              </span>
            </div>

            {/* Permissions List */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 mb-2 uppercase">
                Allowed Pages
              </p>
              <div className="flex flex-wrap gap-1">
                {admin.role === "super_admin" ? (
                  <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-1 rounded font-bold">
                    ALL ACCESS
                  </span>
                ) : JSON.parse(admin.permissions || "[]").length === 0 ? (
                  <span className="text-[10px] text-gray-400 italic">
                    No access
                  </span>
                ) : (
                  JSON.parse(admin.permissions || "[]").map((p: string) => (
                    <span
                      key={p}
                      className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200"
                    >
                      {p}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .input-field {
          @apply w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-school-gold focus:bg-white transition-all text-sm font-medium;
        }
      `}</style>
    </div>
  );
}
