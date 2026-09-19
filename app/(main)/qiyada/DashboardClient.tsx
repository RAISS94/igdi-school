"use client";
import { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  Video,
  MessageSquare,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

type DashboardProps = {
  counts: {
    students: number;
    books: number;
    courses: number;
    messages: number;
  };
  recent: any[];
};

export default function DashboardClient({ counts, recent }: DashboardProps) {
  // 1. Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguage();
  const isAr = language === "ar";

  // 2. Set mounted to true once component hits the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  const t = {
    title: isAr ? "نظرة عامة" : "Dashboard Overview",
    welcome: isAr
      ? "مرحباً بك في مركز القيادة"
      : "Welcome to the Qiyada control center",

    // Stats
    students: isAr ? "الطلاب" : "Students",
    books: isAr ? "الكتب" : "Books",
    courses: isAr ? "الدروس" : "Courses",
    messages: isAr ? "الرسائل" : "Messages",

    // Recent Table
    recent_title: isAr ? "آخر التسجيلات" : "Recent Registrations",
    view_all: isAr ? "عرض الكل" : "View All",
    h_name: isAr ? "اسم الطالب" : "Student Name",
    h_prog: isAr ? "البرنامج" : "Program",
    h_date: isAr ? "التاريخ" : "Date",
    h_status: isAr ? "الحالة" : "Status",

    // Values
    prog_igdi: isAr ? "مدرسة إيكضي" : "Igdi School",
    prog_bayan: isAr ? "مؤسسة البيان" : "Al-Bayan",
    prog_online: isAr ? "عن بعد" : "Online",

    stat_pending: isAr ? "قيد الانتظار" : "Pending",
    stat_approved: isAr ? "مقبول" : "Approved",
    stat_rejected: isAr ? "مرفوض" : "Rejected",
  };

  const stats = [
    {
      title: t.students,
      value: counts.students,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: t.books,
      value: counts.books,
      icon: BookOpen,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: t.courses,
      value: counts.courses,
      icon: Video,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: t.messages,
      value: counts.messages,
      icon: MessageSquare,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div
      className={`space-y-8 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* 1. Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-amiri mb-2">
          {t.title}
        </h1>
        <p className="text-gray-500">{t.welcome}</p>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} className={isAr ? "ml-1" : "mr-1"} />{" "}
                +100%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 3. Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-gray-800 font-amiri">
            {t.recent_title}
          </h2>
          <Link
            href="/qiyada/registrations"
            className="text-sm text-school-gold font-bold hover:underline"
          >
            {t.view_all}
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No recent activity
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className={`w-full text-sm text-gray-600 ${isAr ? "text-right" : "text-left"}`}
            >
              <thead className="bg-gray-50 text-gray-900 font-bold uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">{t.h_name}</th>
                  <th className="px-6 py-4">{t.h_prog}</th>
                  <th className="px-6 py-4">{t.h_date}</th>
                  <th className="px-6 py-4">{t.h_status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {reg.studentName}
                    </td>
                    <td className="px-6 py-4">
                      {reg.program === "igdi"
                        ? t.prog_igdi
                        : reg.program === "bayan"
                          ? t.prog_bayan
                          : t.prog_online}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {/* 3. Render date ONLY after mounting to avoid mismatch */}
                      {mounted ? (
                        new Date(reg.createdAt).toLocaleDateString(
                          isAr ? "ar-EG" : "en-US",
                        )
                      ) : (
                        <div className="w-16 h-4 bg-gray-100 animate-pulse rounded" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          reg.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : reg.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {reg.status === "pending"
                          ? t.stat_pending
                          : reg.status === "approved"
                            ? t.stat_approved
                            : t.stat_rejected}
                      </span>
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
