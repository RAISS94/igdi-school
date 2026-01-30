"use client";
import { useState } from "react";
import {
  Mail,
  Trash2,
  Calendar,
  User,
  Phone,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { deleteMessage, markAsRead } from "./actions";

export default function MessagesClient({ messages }: { messages: any[] }) {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const t = {
    title: isAr ? "الرسائل الواردة" : "Incoming Messages",
    empty: isAr ? "لا توجد رسائل حالياً." : "No messages found.",
    h_sender: isAr ? "المرسل" : "Sender",
    h_subject: isAr ? "الموضوع" : "Subject",
    h_date: isAr ? "التاريخ" : "Date",
    read_more: isAr ? "اقرأ المزيد" : "Read More",
    mark_read: isAr ? "تمت القراءة" : "Mark as Read",
  };

  return (
    <div
      className={`p-6 space-y-6 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <h1 className="text-3xl font-bold text-gray-900 font-amiri">{t.title}</h1>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border text-gray-400">
            {t.empty}
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md ${msg.status === "unread" ? "border-school-gold" : "border-gray-100"}`}
            >
              {/* Message Header */}
              <div
                onClick={() => {
                  setExpandedId(expandedId === msg.id ? null : msg.id);
                  if (msg.status === "unread") markAsRead(msg.id);
                }}
                className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${msg.status === "unread" ? "bg-school-gold/10 text-school-gold" : "bg-gray-100 text-gray-400"}`}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{msg.name}</h3>
                    <p className="text-sm text-gray-500">{msg.subject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <Calendar size={14} />
                    {new Date(msg.createdAt).toLocaleDateString(
                      isAr ? "ar-EG" : "en-US",
                    )}
                  </div>
                  {expandedId === msg.id ? (
                    <ChevronUp className="text-gray-300" />
                  ) : (
                    <ChevronDown className="text-gray-300" />
                  )}
                </div>
              </div>

              {/* Message Content */}
              {expandedId === msg.id && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-50 bg-gray-50/50 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={14} className="text-school-gold" />{" "}
                      {msg.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={14} className="text-school-gold" />{" "}
                      {msg.phone || "N/A"}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 text-gray-800 leading-relaxed">
                    {msg.message}
                  </div>
                  <div className="flex justify-end mt-4">
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                        <Trash2 size={16} />{" "}
                        {isAr ? "حذف الرسالة" : "Delete Message"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
