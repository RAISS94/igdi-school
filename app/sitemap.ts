import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";
import { client } from "@/sanity/lib/client";

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://igdi-school.ma"; // Change to your real domain

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/courses",
    "/library",
    "/scholars",
    "/contact",
    "/blog",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Dynamic Routes (Courses - Still in Prisma)
  let courseRoutes: any[] = [];
  try {
    const courses = await prisma.course.findMany({ select: { id: true } });
    courseRoutes = courses.map((course) => ({
      url: `${baseUrl}/courses/${course.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching courses for sitemap:", error);
  }

  // 3. Dynamic Routes (Scholars - Now in Sanity)
  let scholarRoutes: any[] = [];
  try {
    const scholars = await client.fetch(`*[_type == "scholar"]{ _id }`);
    scholarRoutes = scholars.map((scholar: { _id: string }) => ({
      url: `${baseUrl}/scholars/${scholar._id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error("Error fetching scholars for sitemap:", error);
  }

  // 4. Dynamic Routes (Blog Posts - Now in Sanity)
  let blogRoutes: any[] = [];
  try {
    // Checking both "article" and "post" to ensure we catch your specific Sanity schema name
    const articles = await client.fetch(
      `*[_type == "article" || _type == "post"]{ _id }`,
    );
    blogRoutes = articles.map((article: { _id: string }) => ({
      url: `${baseUrl}/blog/${article._id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  return [...staticRoutes, ...courseRoutes, ...scholarRoutes, ...blogRoutes];
}
