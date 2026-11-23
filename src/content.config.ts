import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const basePost = (name: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${name}` }),
    schema: z.object({
      title: z.string(),
      meta_robots: z.string().default('index, follow'),
      meta_description: z.string(),
      categories: z.any().optional(),
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      dateUpdate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      heroImage: z.string().optional(),
      heroAltImage: z.string().optional(),
      translationKey: z.string().optional()
    })
  })

const blog = basePost('blog')
const deliveries = basePost('deliveries')
const talks = basePost('talks')

export const collections = { blog, deliveries, talks }
