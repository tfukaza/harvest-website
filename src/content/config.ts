import { z, defineCollection } from 'astro:content';

const docCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
    }),
});

const tutorialCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'docs': docCollection,
  'tutorials': tutorialCollection,
};