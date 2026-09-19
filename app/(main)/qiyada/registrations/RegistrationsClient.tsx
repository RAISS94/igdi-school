"use client";

import { useState } from "react";
import {
  Check,
  X,
  Trash2,
  Clock,
  MapPin,
  Phone,
  School,
  BookOpen,
  Wifi,
  Search,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
// Make sure this path points to where you saved the actions file!
import { deleteRegistration, updateRegistrationStatus } from "./actions";

// Define the shape of our data
type Registration = {
  id: string;
  studentName: string;
  program: string;
  age: number;
  city: string;
  phone: string;
  status: string;
  email: string | null;
  createdAt: Date;
};

export default function RegistrationsClient({
  data,
}: {
  data: Registration[];
}) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // 1. STATE FOR TABS & SEARCH
  const [activeTab, setActiveTab] = useState("igdi"); // 'igdi' | 'bayan' | 'online'
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // --- TRANSLATIONS ---
  const t = {
    title: isAr ? "طلبات التسجيل" : "Registration Requests",

    // Tabs
    tab_igdi: isAr ? "مدرسة إيكضي" : "Igdi School",
    tab_bayan: isAr ? "مؤسسة البيان" : "Al-Bayan",
    tab_online: isAr ? "عن بعد" : "Online",

    // Table
    empty: isAr
      ? "لا توجد طلبات في هذا القسم."
      : "No registrations in this section.",
    h_student: isAr ? "الطالب" : "Student",
    h_details: isAr ? "العمر / المدينة" : "Age / City",
    h_contact: isAr ? "الاتصال" : "Contact",
    h_status: isAr ? "الحالة" : "Status",
    h_actions: isAr ? "إجراءات" : "Actions",

    // Values
    stat_pending: isAr ? "قيد الانتظار" : "Pending",
    stat_approved: isAr ? "مقبول" : "Approved",
    stat_rejected: isAr ? "مرفوض" : "Rejected",
    age_suffix: isAr ? "سنة" : "yo",
    search_ph: isAr ? "بحث بالاسم..." : "Search by name...",
  };

  // 2. FILTERING LOGIC
  const filteredData = data.filter((reg) => {
    // A. Must match the active tab (program)
    const matchesTab = reg.program === activeTab;

    // B. Must match search (if typed)
    const matchesSearch =
      reg.studentName.toLowerCase().includes(search.toLowerCase()) ||
      reg.phone.includes(search);

    return matchesTab && matchesSearch;
  });

  // 3. ACTION HANDLER (Wrapper for the server action)
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      await updateRegistrationStatus(id, newStatus);
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      className={`space-y-6 font-noto ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-amiri">
            {t.title}{" "}
            <span className="text-gray-400 text-lg">({data.length})</span>
          </h1>
        </div>

        <div className="relative">
          <Search
            className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isAr ? "right-3" : "left-3"}`}
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search_ph}
            // FIX: Removed "pl-10 pr-4" from the start so the conditional logic below works correctly
            className={`py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-school-gold outline-none w-full md:w-64 ${
              isAr
                ? "pr-10 pl-4" // Arabic: Big padding on Right (for icon), small on Left
                : "pl-10 pr-4" // English: Big padding on Left (for icon), small on Right
            }`}
          />
        </div>
      </div>

      {/* --- SMART TABS --- */}
      <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
        {[
          { id: "igdi", label: t.tab_igdi, icon: School },
          { id: "bayan", label: t.tab_bayan, icon: BookOpen },
          { id: "online", label: t.tab_online, icon: Wifi },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          // Count how many students are in this specific tab
          const count = data.filter((r) => r.program === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-white text-school-dark shadow-sm scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <tab.icon
                size={16}
                className={isActive ? "text-school-gold" : ""}
              />
              <span>{tab.label}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? "bg-school-gold/10 text-school-dark" : "bg-gray-200 text-gray-500"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* DATA TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <School size={48} className="mb-4 opacity-20" />
            <p>{t.empty}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full ${isAr ? "text-right" : "text-left"}`}>
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">{t.h_student}</th>
                  <th className="px-6 py-4">{t.h_details}</th>
                  <th className="px-6 py-4">{t.h_contact}</th>
                  <th className="px-6 py-4">{t.h_status}</th>
                  <th className="px-6 py-4 text-center">{t.h_actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Student Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-school-gold/10 flex items-center justify-center text-school-dark text-xs font-bold">
                          {reg.studentName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-gray-900">
                          {reg.studentName}
                        </span>
                      </div>
                    </td>

                    {/* Age & City */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {reg.age} {t.age_suffix}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {reg.city}
                        </span>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td
                      className="px-6 py-4 text-sm font-mono text-gray-600"
                      dir="ltr"
                    >
                      <div
                        className={`flex items-center gap-2 ${isAr ? "justify-end" : "justify-start"}`}
                      >
                        <Phone size={12} className="text-gray-400" />
                        <span>{reg.phone}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          reg.status === "approved"
                            ? "bg-green-50 text-green-700"
                            : reg.status === "rejected"
                              ? "bg-red-50 text-red-700"
                              : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {reg.status === "pending"
                          ? t.stat_pending
                          : reg.status === "approved"
                            ? t.stat_approved
                            : t.stat_rejected}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Approve Button */}
                        <button
                          onClick={() => handleStatusUpdate(reg.id, "approved")}
                          disabled={loadingId === reg.id}
                          className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>

                        {/* Reject Button */}
                        <button
                          onClick={() => handleStatusUpdate(reg.id, "rejected")}
                          disabled={loadingId === reg.id}
                          className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors disabled:opacity-50"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>

                        {/* Delete Button (Uses Server Action Form) */}
                        <form
                          action={async (formData) => {
                            await deleteRegistration(formData);
                          }}
                        >
                          <input type="hidden" name="id" value={reg.id} />
                          <button
                            className="p-2 hover:bg-gray-200 text-gray-500 rounded-lg transition-colors"
                            title="Delete"
                            type="submit"
                          >
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
