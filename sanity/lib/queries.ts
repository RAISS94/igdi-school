import { sanityClient } from "./client";
import { urlForImage } from "./image";

// GROQ Queries
export const SCHOLARS_QUERY = `*[_type == "scholar"] | order(order asc, _createdAt asc) {
  _id,
  name_ar,
  name_en,
  title_ar,
  title_en,
  specialty_ar,
  specialty_en,
  bio_ar,
  bio_en,
  image,
  "imageUrl": image.asset->url
}`;

export const SCHOLAR_BY_ID_QUERY = `*[_type == "scholar" && (_id == $id || name_en == $id)][0] {
  _id,
  name_ar,
  name_en,
  title_ar,
  title_en,
  specialty_ar,
  specialty_en,
  bio_ar,
  bio_en,
  image,
  "imageUrl": image.asset->url
}`;

export const BOOKS_QUERY = `*[_type == "book"] | order(_createdAt desc) {
  _id,
  title_ar,
  title_en,
  author_ar,
  author_en,
  category,
  desc_ar,
  desc_en,
  coverImage,
  "coverUrl": coverImage.asset->url,
  "pdfAssetUrl": pdfFile.asset->url,
  externalPdfUrl
}`;

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  title_ar,
  title_en,
  slug,
  author,
  category_ar,
  category_en,
  content_ar,
  content_en,
  publishedAt,
  _createdAt,
  mainImage,
  "imageUrl": mainImage.asset->url
}`;

export const POST_BY_ID_QUERY = `*[_type == "post" && (_id == $id || slug.current == $id)][0] {
  _id,
  title_ar,
  title_en,
  slug,
  author,
  category_ar,
  category_en,
  content_ar,
  content_en,
  publishedAt,
  _createdAt,
  mainImage,
  "imageUrl": mainImage.asset->url
}`;

// Data Fetching Helper Functions connected ONLY to Sanity
export async function getScholars() {
  try {
    const sanityScholars = await sanityClient.fetch(SCHOLARS_QUERY);
    if (sanityScholars && sanityScholars.length > 0) {
      return sanityScholars.map((item: any) => ({
        id: item._id,
        name_ar: item.name_ar,
        name_en: item.name_en,
        title_ar: item.title_ar || "",
        title_en: item.title_en || "",
        specialty_ar: item.specialty_ar || "",
        specialty_en: item.specialty_en || "",
        bio_ar: item.bio_ar || "",
        bio_en: item.bio_en || "",
        image:
          item.imageUrl ||
          (item.image ? urlForImage(item.image) : null) ||
          "/igdi-hero.jpeg",
      }));
    }
    return [];
  } catch (err) {
    console.error("Sanity scholars fetch error:", err);
    return [];
  }
}

export async function getScholarById(id: string) {
  try {
    const sanityScholar = await sanityClient.fetch(SCHOLAR_BY_ID_QUERY, { id });
    if (sanityScholar) {
      return {
        id: sanityScholar._id,
        name_ar: sanityScholar.name_ar,
        name_en: sanityScholar.name_en,
        title_ar: sanityScholar.title_ar || "",
        title_en: sanityScholar.title_en || "",
        specialty_ar: sanityScholar.specialty_ar || "العلوم الشرعية",
        specialty_en: sanityScholar.specialty_en || "Islamic Sciences",
        bio_ar: sanityScholar.bio_ar || "",
        bio_en: sanityScholar.bio_en || "",
        image:
          sanityScholar.imageUrl ||
          (sanityScholar.image ? urlForImage(sanityScholar.image) : null) ||
          "/igdi-hero.jpeg",
      };
    }
    return null;
  } catch (err) {
    console.error("Sanity scholar fetch error:", err);
    return null;
  }
}

export async function getBooks() {
  try {
    const sanityBooks = await sanityClient.fetch(BOOKS_QUERY);
    if (sanityBooks && sanityBooks.length > 0) {
      return sanityBooks.map((item: any) => ({
        id: item._id,
        title_ar: item.title_ar,
        title_en: item.title_en,
        author_ar: item.author_ar || "",
        author_en: item.author_en || "",
        category: item.category || "عام",
        desc_ar: item.desc_ar || "",
        desc_en: item.desc_en || "",
        coverUrl:
          item.coverUrl ||
          (item.coverImage ? urlForImage(item.coverImage) : null) ||
          null,
        pdfUrl: item.pdfAssetUrl || item.externalPdfUrl || "#",
      }));
    }
    return [];
  } catch (err) {
    console.error("Sanity books fetch error:", err);
    return [];
  }
}

export async function getBlogPosts() {
  try {
    const sanityPosts = await sanityClient.fetch(POSTS_QUERY);
    if (sanityPosts && sanityPosts.length > 0) {
      return sanityPosts.map((item: any) => ({
        id: item._id,
        title_ar: item.title_ar,
        title_en: item.title_en,
        slug: item.slug?.current || item._id,
        author: item.author || "إدارة المدرسة",
        category_ar: item.category_ar || "أخبار",
        category_en: item.category_en || "News",
        content_ar: item.content_ar || "",
        content_en: item.content_en || "",
        createdAt: item.publishedAt || item._createdAt,
        image:
          item.imageUrl ||
          (item.mainImage ? urlForImage(item.mainImage) : null) ||
          "/igdi-hero.jpeg",
      }));
    }
    return [];
  } catch (err) {
    console.error("Sanity posts fetch error:", err);
    return [];
  }
}

export async function getBlogPostById(id: string) {
  try {
    const sanityPost = await sanityClient.fetch(POST_BY_ID_QUERY, { id });
    if (sanityPost) {
      return {
        id: sanityPost._id,
        title_ar: sanityPost.title_ar,
        title_en: sanityPost.title_en,
        author: sanityPost.author || "إدارة المدرسة",
        category_ar: sanityPost.category_ar || "أخبار",
        category_en: sanityPost.category_en || "News",
        content_ar: sanityPost.content_ar || "",
        content_en: sanityPost.content_en || "",
        createdAt: sanityPost.publishedAt || sanityPost._createdAt,
        image:
          sanityPost.imageUrl ||
          (sanityPost.mainImage ? urlForImage(sanityPost.mainImage) : null) ||
          "/igdi-hero.jpeg",
      };
    }
    return null;
  } catch (err) {
    console.error("Sanity post fetch error:", err);
    return null;
  }
}
