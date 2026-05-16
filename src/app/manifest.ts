import type { MetadataRoute } from "next";
import { site } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: site.backgroundColor,
    theme_color: site.themeColor,
    lang: "ar",
    dir: "rtl",
    categories: ["productivity", "developer", "education"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/pwa-icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Search",
        short_name: "Search",
        description: "Open the knowledge search page",
        url: "/search",
      },
      {
        name: "Tags",
        short_name: "Tags",
        description: "Browse entries by tag",
        url: "/tags",
      },
    ],
  };
}
