import { newsItems } from "../../../data/newsData";
import BlogPostContent from "../../../components/BlogPostContent";

// --- 1. SEO METADATA (Server Side) ---
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = newsItems.find((p) => p.id.toString() === params.id);
  // Returns English title by default for metadata, but Google reads the page content too
  return {
    title: post ? `${post.title_en} | IGDI Journal` : "Article Not Found",
    description: post ? post.excerpt_en : "School news and updates.",
  };
}

// --- 2. MAIN PAGE COMPONENT ---
export default function BlogPostPage({ params }: { params: { id: string } }) {
  // A. Find the real post
  let post = newsItems.find((p) => p.id.toString() === params.id);

  // B. Fallback Fake Data (So you don't see errors during development)
  if (!post) {
    post = {
      id: 999,
      image: "/igdi-hero.jpeg",
      date: "2026-02-01",
      category_ar: "تجربة",
      category_en: "Preview",
      title_ar: "عنوان المقال التجريبي: كيف يظهر التصميم بالعربية؟",
      title_en: "Experimental Article Title: How Design Looks in English?",
      excerpt_ar:
        "هذا نص تمهيدي عريض يظهر في بداية المقال لشد انتباه القارئ وتلخيص المحتوى.",
      excerpt_en:
        "This is a bold introductory text appearing at the start of the article to grab attention.",
      // Content for Arabic Mode
      content_ar: `
        <p>هذا هو المحتوى الرئيسي للمقال. عندما تكون اللغة عربية، سيظهر هذا النص فقط.</p>
        <h3>عنوان فرعي داخل المقال</h3>
        <p>يمكننا إضافة قوائم ونقاط:</p>
        <ul>
          <li>النقطة الأولى مهمة جداً.</li>
          <li>النقطة الثانية توضح الفكرة.</li>
        </ul>
        <p>وهكذا يستمر المقال بتنسيق جميل ومريح للقراءة.</p>
      `,
      // Content for English Mode
      content_en: `
        <p>This is the main content of the article. When the language is English, only this text will appear.</p>
        <h3>Subheading inside article</h3>
        <p>We can add lists and bullet points:</p>
        <ul>
          <li>The first point is very important.</li>
          <li>The second point clarifies the idea.</li>
        </ul>
        <p>And so the article continues with a beautiful, readable layout.</p>
      `,
    };
  }

  // C. Pass data to the Client Component
  return <BlogPostContent post={post} />;
}
