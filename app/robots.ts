import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://igdi-school.ma"; // Change to your real domain

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/qiyada/", // Protect the admin dashboard from being indexed
                "/api/",    // Prevent indexing API routes
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
