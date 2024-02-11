import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        meta_robots: z.string().default('index, follow'),
        meta_description: z.string(),
        categories: z.any().optional(),
        date: z.string().or(z.date()).transform((val) => new Date(val)),
        dateUpdate: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
        heroImage: z.string().optional(),
        heroAltImage: z.string().optional()
    })
});

export const collections = { blog };
