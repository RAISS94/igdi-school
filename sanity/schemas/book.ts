import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Books & Resources",
  type: "document",
  fields: [
    defineField({
      name: "title_ar",
      title: "Title (Arabic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_en",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author_ar",
      title: "Author (Arabic)",
      type: "string",
    }),
    defineField({
      name: "author_en",
      title: "Author (English)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. الفقه, العقيدة, النحو, السيرة",
    }),
    defineField({
      name: "desc_ar",
      title: "Description (Arabic)",
      type: "text",
    }),
    defineField({
      name: "desc_en",
      title: "Description (English)",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Book Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File Asset",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "externalPdfUrl",
      title: "External PDF URL (Optional)",
      type: "url",
      description: "Direct link to PDF if not uploading asset file directly",
    }),
  ],
  preview: {
    select: {
      title: "title_ar",
      subtitle: "author_ar",
      media: "coverImage",
    },
  },
});
