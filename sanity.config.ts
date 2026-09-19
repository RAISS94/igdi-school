import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project-id";
const projectId = rawProjectId.replace(/[^a-z0-9-]/gi, "-").toLowerCase() || "demo-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "igdi_school_cms",
  title: "Igdi School Sanity Studio",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
