import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ pattern: "*.md", base: "./posts" }),
	schema: z.object({
		title: z.string(),
		desc: z.string(),
		category: z.string(),
		tags: z.array(z.string()),
	}),
});

export const collections = { blog };
