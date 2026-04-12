import { MetadataRoute } from 'next';
import { allCars } from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nekadaryakar.com.tr';

  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Extract unique Make-Model combinations to create programmatic routes
  const carPages = allCars.reduce((acc, car) => {
    const slug = `${car.make.toLowerCase()}-${car.model.toLowerCase()}`.replace(/\s+/g, '-');
    const url = `${baseUrl}/arac/${slug}`;
    if (!acc.some((item: any) => item.url === url)) {
      acc.push({
        url: url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
    return acc;
  }, [] as MetadataRoute.Sitemap);

  return [...defaultPages, ...carPages];
}
