import createImageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: any) => {
  if (!source) return null;
  // If it's already a full HTTP URL or relative path string, return it directly
  if (typeof source === "string") return source;
  try {
    return builder.image(source).url();
  } catch (err) {
    return null;
  }
};
