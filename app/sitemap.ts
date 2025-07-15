import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolshub.com"

  // Static pages
  const staticPages = ["", "/blog", "/about", "/contact", "/privacy", "/terms"]

  // Tool categories
  const toolCategories = [
    "/tools/pdf",
    "/tools/image",
    "/tools/text",
    "/tools/calculators",
    "/tools/seo",
    "/tools/color",
  ]

  // Individual tools
  const tools = [
    "/tools/pdf/pdf-to-word",
    "/tools/pdf/merge-pdf",
    "/tools/pdf/split-pdf",
    "/tools/pdf/compress-pdf",
    "/tools/text/word-counter",
    "/tools/calculators/bmi-calculator",
  ]

  // Blog categories
  const blogCategories = ["/blog/seo-tips", "/blog/tech-guides", "/blog/productivity"]

  const allPages = [...staticPages, ...toolCategories, ...tools, ...blogCategories]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page.includes("/blog") ? "weekly" : "monthly",
    priority: page === "" ? 1 : page.includes("/tools") ? 0.8 : 0.6,
  }))
}
