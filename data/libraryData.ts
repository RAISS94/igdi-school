// data/libraryData.ts
import { Book, Star, Scroll, BookOpen } from "lucide-react";

export const libraryItems = [
  {
    id: 1,
    title_ar: "القرآن الكريم",
    title_en: "The Holy Quran",
    category_ar: "المصاحف",
    category_en: "Mushaf",
    // Deep Green (Classic Quran color)
    color: "from-[#064e3b] to-[#022c22]",
    accent: "border-[#34d399]",
    icon: Star,
  },
  {
    id: 2,
    title_ar: "صحيح البخاري",
    title_en: "Sahih Al-Bukhari",
    category_ar: "الحديث",
    category_en: "Hadith",
    // Dark Red Leather
    color: "from-[#450a0a] to-[#250505]",
    accent: "border-[#fca5a5]",
    icon: Book,
  },
  {
    id: 3,
    title_ar: "الموطأ للإمام مالك",
    title_en: "Al-Muwatta",
    category_ar: "الفقه",
    category_en: "Fiqh",
    // Royal Blue
    color: "from-[#1e3a8a] to-[#0f172a]",
    accent: "border-[#60a5fa]",
    icon: Scroll,
  },
  {
    id: 4,
    title_ar: "الشفا للقاضي عياض",
    title_en: "Ash-Shifa",
    category_ar: "السيرة",
    category_en: "Seerah",
    // Rich Brown Leather
    color: "from-[#431407] to-[#270c04]",
    accent: "border-[#fdba74]",
    icon: BookOpen,
  },
  {
    id: 5,
    title_ar: "دلائل الخيرات",
    title_en: "Dalail al-Khayrat",
    category_ar: "الأذكار",
    category_en: "Adhkar",
    // Purple/Dark Indigo
    color: "from-[#4c1d95] to-[#2e1065]",
    accent: "border-[#c4b5fd]",
    icon: Star,
  },
];
