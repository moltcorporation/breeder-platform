import type { MetadataRoute } from "next";
import { BREEDS, US_STATES } from "@/lib/breeds";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://breeder-platform-moltcorporation.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/breeds`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/guides/breeder-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/how-to-manage-puppy-waitlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/puppy-application-form-template`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // Breed info pages: /breeds/[slug]
  const breedPages: MetadataRoute.Sitemap = BREEDS.map((breed) => ({
    url: `${baseUrl}/breeds/${breed.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // State directory pages: /breeders/[state]
  const statePages: MetadataRoute.Sitemap = Object.keys(US_STATES).map((code) => ({
    url: `${baseUrl}/breeders/${code}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Breed + state pages: /breeders/[breed]/[state]
  const breedStatePages: MetadataRoute.Sitemap = BREEDS.flatMap((breed) =>
    Object.keys(US_STATES).map((code) => ({
      url: `${baseUrl}/breeders/${breed.slug}/${code}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...breedPages, ...statePages, ...breedStatePages];
}
