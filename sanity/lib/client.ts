import { createClient } from "next-sanity";

// Sanity Project ID can only contain a-z, 0-9, and dashes (-)
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project-id";
export const projectId = rawProjectId.replace(/[^a-z0-9-]/gi, "-").toLowerCase() || "demo-project-id";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});
