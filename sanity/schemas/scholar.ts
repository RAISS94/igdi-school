import { defineField, defineType } from "sanity";

export const scholar = defineType({
  name: "scholar",
  title: "Scholars",
  type: "document",
  fields: [
    defineField({
      name: "name_ar",
      title: "Name (Arabic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name_en",
      title: "Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_ar",
      title: "Title / Role (Arabic)",
      type: "string",
      description: "e.g. الشيخ المشرف or أستاذ الفقه",
    }),
    defineField({
      name: "title_en",
      title: "Title / Role (English)",
      type: "string",
      description: "e.g. Supervising Sheikh or Professor of Fiqh",
    }),
    defineField({
      name: "specialty_ar",
      title: "Specialty (Arabic)",
      type: "string",
    }),
    defineField({
      name: "specialty_en",
      title: "Specialty (English)",
      type: "string",
    }),
    defineField({
      name: "bio_ar",
      title: "Biography (Arabic)",
      type: "text",
    }),
    defineField({
      name: "bio_en",
      title: "Biography (English)",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Scholar Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name_ar",
      subtitle: "title_ar",
      media: "image",
    },
  },
});
