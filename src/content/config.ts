import { defineCollection, z } from 'astro:content';

const basePost = defineCollection({
    schema: z.object({
        title: z.string(),
        meta_robots: z.string().default('index, follow'),
        meta_description: z.string(),
        categories: z.any().optional(),
        date: z.string().or(z.date()).transform((val) => new Date(val)),
        dateUpdate: z.string().or(z.date()).transform((val) => new Date(val)),
        heroImage: z.string().optional(),
        heroAltImage: z.string().optional()
    })
});

const blog = basePost;
const deliveries = basePost;
const talks = basePost;

export const collections = { blog, deliveries, talks };
