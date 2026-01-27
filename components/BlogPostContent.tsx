"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Tag,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Define the shape of the news object
type BlogPost = {
  id: number;
  image: string;
  date: string;
  category_ar: string;
  category_en: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  content_ar?: string;
  content_en?: string;
};

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // --- TRANSLATIONS FOR LABELS ---
  const t = {
    back: isAr ? "العودة للمدونة" : "Back to Journal",
    share: isAr ? "مشاركة" : "Share",
    admin: isAr ? "الإدارة" : "Admin",
    schoolName: isAr ? "مدرسة ايكضي" : "IGDI School",
    published: isAr ? "نشر في" : "Published on",
  };

  return (
    <article className="min-h-screen bg-white dark:bg-school-dark pb-24">
      {/* 1. IMMERSIVE HERO HEADER */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={post.image}
          alt={isAr ? post.title_ar : post.title_en}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-4xl text-center text-white">
            {/* Category & Date Badge */}
            <div className="flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest text-school-gold mb-6 animate-fade-in-up">
              <span className="flex items-center gap-2">
                <Tag size={14} />
                {isAr ? post.category_ar : post.category_en}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {post.date}
              </span>
            </div>

            {/* Title (Language Switched) */}
            <h1
              className={`text-4xl md:text-6xl leading-tight mb-8 drop-shadow-lg animate-fade-in-up delay-100 ${isAr ? "font-amiri" : "font-sans font-bold"}`}
            >
              {isAr ? post.title_ar : post.title_en}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT CARD */}
      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white dark:bg-[#1a202c] p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5">
          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center border border-school-gold/20">
                <User size={24} className="text-gray-500 dark:text-gray-300" />
              </div>
              <div>
                <span className="block text-sm font-bold text-school-dark dark:text-white">
                  {t.admin}
                </span>
                <span className="block text-xs text-gray-500 uppercase tracking-wider">
                  {t.schoolName}
                </span>
              </div>
            </div>

            <button className="flex items-center gap-2 text-gray-400 hover:text-school-gold transition-colors text-sm font-bold border px-4 py-2 rounded-full hover:border-school-gold">
              <Share2 size={16} />
              <span>{t.share}</span>
            </button>
          </div>

          {/* --- THE CONTENT (Full Language Switch) --- */}
          <div
            className={`prose prose-lg dark:prose-invert max-w-none leading-loose ${isAr ? "prose-headings:font-amiri font-noto text-right" : "prose-headings:font-sans text-left"}`}
          >
            {/* Bold Intro Paragraph */}
            <p className="font-bold text-xl leading-relaxed text-school-dark dark:text-white/90">
              {isAr ? post.excerpt_ar : post.excerpt_en}
            </p>

            {/* Main Body Content */}
            {/* This renders ONLY the Arabic HTML if language is AR, or ONLY English if EN */}
            <div
              dangerouslySetInnerHTML={{
                __html: isAr ? post.content_ar || "" : post.content_en || "",
              }}
            />
          </div>

          {/* Back Button */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-school-gold font-bold hover:text-school-dark transition-colors group"
            >
              {/* Direction aware arrows */}
              <ArrowRight className="ltr:hidden group-hover:-translate-x-1 transition-transform" />
              <ArrowLeft className="rtl:hidden group-hover:translate-x-1 transition-transform" />
              <span>{t.back}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
