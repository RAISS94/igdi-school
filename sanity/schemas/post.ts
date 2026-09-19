import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Posts & News",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title_en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author Name",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category_ar",
      title: "Category (Arabic)",
      type: "string",
      initialValue: "أخبار",
    }),
    defineField({
      name: "category_en",
      title: "Category (English)",
      type: "string",
      initialValue: "News",
    }),
    defineField({
      name: "content_ar",
      title: "Content (Arabic)",
      type: "text",
    }),
    defineField({
      name: "content_en",
      title: "Content (English)",
      type: "text",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title_ar",
      subtitle: "author",
      media: "mainImage",
    },
  },
});
