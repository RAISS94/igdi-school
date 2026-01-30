"use client";
import { Check, X, Trash2, Clock, MapPin, Phone } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext"; // Check your path!
import { deleteRegistration, updateStatus } from "./actions";

// Define the type of data we are receiving
type Registration = {
  id: string;
  studentName: string;
  program: string;
  age: number;
  city: string;
  phone: string;
  status: string;
};

export default function RegistrationsClient({
  data,
}: {
  data: Registration[];
}) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // --- TRANSLATIONS ---
  const t = {
    title: isAr ? "طلبات التسجيل" : "Registration Requests",
    empty: isAr
      ? "لا توجد طلبات تسجيل حتى الآن."
      : "No registrations found yet.",

    // Headers
    h_student: isAr ? "الطالب" : "Student",
    h_program: isAr ? "البرنامج" : "Program",
    h_details: isAr ? "العمر / المدينة" : "Age / City",
    h_contact: isAr ? "الاتصال" : "Contact",
    h_status: isAr ? "الحالة" : "Status",
    h_actions: isAr ? "إجراءات" : "Actions",

    // Values (Programs & Status)
    prog_igdi: isAr ? "مدرسة إيكضي" : "Igdi School",
    prog_bayan: isAr ? "مؤسسة البيان" : "Al-Bayan",
    prog_online: isAr ? "عن بعد" : "Online",

    stat_pending: isAr ? "قيد الانتظار" : "Pending",
    stat_approved: isAr ? "مقبول" : "Approved",
    stat_rejected: isAr ? "مرفوض" : "Rejected",

    // Labels
    age_suffix: isAr ? "سنة" : "yo",
  };

  return (
    <div
      className={`space-y-6 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 font-amiri">
          {t.title}{" "}
          <span className="text-gray-400 text-lg">({data.length})</span>
        </h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {data.length === 0 ? (
          <div className="p-12 text-center text-gray-500">{t.empty}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full ${isAr ? "text-right" : "text-left"}`}>
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">{t.h_student}</th>
                  <th className="px-6 py-4">{t.h_program}</th>
                  <th className="px-6 py-4">{t.h_details}</th>
                  <th className="px-6 py-4">{t.h_contact}</th>
                  <th className="px-6 py-4">{t.h_status}</th>
                  <th className="px-6 py-4 text-center">{t.h_actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Name (User Input - Not Translated) */}
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {reg.studentName}
                    </td>

                    {/* Program (Translated) */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          reg.program === "igdi"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : reg.program === "bayan"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                        }`}
                      >
                        {reg.program === "igdi"
                          ? t.prog_igdi
                          : reg.program === "bayan"
                            ? t.prog_bayan
                            : t.prog_online}
                      </span>
                    </td>

                    {/* Age & City (Mixed) */}
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

                    {/* Contact (Numbers usually stay LTR) */}
                    <td
                      className="px-6 py-4 text-sm font-mono text-gray-600"
                      dir="ltr"
                    >
                      <div
                        className={`flex items-center gap-2 ${isAr ? "justify-end" : "justify-start"}`}
                      >
                        {isAr ? (
                          <>
                            <span>{reg.phone}</span>
                            <Phone size={12} className="text-gray-400" />
                          </>
                        ) : (
                          <>
                            <Phone size={12} className="text-gray-400" />
                            <span>{reg.phone}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Status (Translated) */}
                    <td className="px-6 py-4">
                      {reg.status === "pending" && (
                        <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-xs font-bold">
                          {t.stat_pending}
                        </span>
                      )}
                      {reg.status === "approved" && (
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">
                          {t.stat_approved}
                        </span>
                      )}
                      {reg.status === "rejected" && (
                        <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold">
                          {t.stat_rejected}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <form action={updateStatus}>
                          <input type="hidden" name="id" value={reg.id} />
                          <input type="hidden" name="status" value="approved" />
                          <button className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors">
                            <Check size={18} />
                          </button>
                        </form>

                        <form action={updateStatus}>
                          <input type="hidden" name="id" value={reg.id} />
                          <input type="hidden" name="status" value="rejected" />
                          <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                            <X size={18} />
                          </button>
                        </form>

                        <form action={deleteRegistration}>
                          <input type="hidden" name="id" value={reg.id} />
                          <button className="p-2 hover:bg-gray-200 text-gray-500 rounded-lg transition-colors">
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
