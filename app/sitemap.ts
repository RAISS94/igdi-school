import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

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

    // 2. Dynamic Routes (Courses)
    const courses = await prisma.course.findMany({ select: { id: true } });
    const courseRoutes = courses.map((course) => ({
        url: `${baseUrl}/courses/${course.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // 3. Dynamic Routes (Scholars)
    const scholars = await prisma.scholar.findMany({ select: { id: true } });
    const scholarRoutes = scholars.map((scholar) => ({
        url: `${baseUrl}/scholars/${scholar.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }));

    // 4. Dynamic Routes (Blog Posts)
    const articles = await prisma.article.findMany({ select: { id: true } });
    const blogRoutes = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...courseRoutes, ...scholarRoutes, ...blogRoutes];
}
