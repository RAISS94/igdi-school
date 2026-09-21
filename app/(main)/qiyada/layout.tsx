"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Video,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Globe,
  Shield,
  ExternalLink, // Added icon for Sanity
} from "lucide-react";
import { useState } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AdminShell>{children}</AdminShell>
    </LanguageProvider>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const isAr = language === "ar";
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // === SPECIAL LOGIN LAYOUT ===
  // Cleaned up to remove the duplicate language button!
  if (pathname === "/qiyada/login") {
    return <div dir={isAr ? "rtl" : "ltr"}>{children}</div>;
  }

  const menuItems = [
    {
      name: isAr ? "لوحة القيادة" : "Dashboard",
      href: "/qiyada",
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      name: isAr ? "طلبات التسجيل" : "Registrations",
      href: "/qiyada/registrations",
      icon: Users,
      id: "registrations",
    },
    {
      name: isAr ? "إدارة الدروس" : "Courses",
      href: "/qiyada/courses",
      icon: Video,
      id: "courses",
    },
    {
      name: isAr ? "الرسائل" : "Messages",
      href: "/qiyada/messages",
      icon: MessageSquare,
      id: "messages",
    },
    {
      name: isAr ? "إدارة المشرفين" : "Admin Management",
      href: "/qiyada/admins",
      icon: Shield,
      id: "admins",
    },
  ];

  const hasPermission = (pageId: string) => {
    return true;
  };

  const visibleMenuItems = menuItems.filter((item) => hasPermission(item.id));

  const t = {
    title: isAr ? "القيادة" : "QIYADA",
    logout: isAr ? "تسجيل الخروج" : "Sign Out",
    admin: isAr ? "المشرف" : "Admin",
    role: isAr ? "مسؤول النظام" : "Super User",
    studio: isAr ? "إدارة المحتوى (Sanity)" : "Sanity Studio",
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 flex font-noto text-gray-800 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 ${isAr ? "right-0" : "left-0"} z-50 w-64 bg-[#0B1120] text-white transition-transform duration-300 ease-in-out ${
          isSidebarOpen
            ? "translate-x-0"
            : isAr
              ? "translate-x-full lg:translate-x-0"
              : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center px-8 border-b border-white/10 justify-between">
            <h1 className="text-2xl font-amiri font-bold text-school-gold tracking-wider">
              {t.title}
            </h1>
            <button
              onClick={() => setLanguage(isAr ? "en" : "ar")}
              className="text-gray-400 hover:text-white transition-colors"
              title="Switch Language"
            >
              <Globe size={18} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {visibleMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-school-gold text-school-dark font-bold shadow-lg"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} className={isAr ? "ml-2" : "mr-2"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            {/* Sanity Studio Link */}
            <Link
              href="/studio"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 w-full text-school-gold hover:bg-school-gold/10 rounded-xl transition-colors"
            >
              <ExternalLink size={20} className={isAr ? "ml-2" : "mr-2"} />
              <span>{t.studio}</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/qiyada/login" })}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
            >
              <LogOut size={20} className={isAr ? "ml-2" : "mr-2"} />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isAr ? "lg:mr-64" : "lg:ml-64"}`}
      >
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div
              className={`hidden sm:block ${isAr ? "text-left" : "text-right"}`}
            >
              <p className="text-sm font-bold text-gray-900">{t.admin}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
            <div className="w-10 h-10 bg-school-gold/20 rounded-full flex items-center justify-center text-school-gold font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
