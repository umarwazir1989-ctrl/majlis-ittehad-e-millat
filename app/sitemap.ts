import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/seo/site";
import {
  getPublicActivities,
  getPublicArticles,
  getPublicPeople,
} from "../lib/content/public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, activities, people] = await Promise.all([
    getPublicArticles(),
    getPublicActivities(),
    getPublicPeople(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/vision",
    "/leadership",
    "/advisory",
    "/articles",
    "/activities",
    "/membership",
    "/contact",
    "/search",
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.url}/articles/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const activityPages: MetadataRoute.Sitemap = activities.map((activity) => ({
    url: `${siteConfig.url}/activities/${activity.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const peoplePages: MetadataRoute.Sitemap = people.map((person) => ({
    url: `${siteConfig.url}/people/${person.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...activityPages,
    ...peoplePages,
  ];
}
