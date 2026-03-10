import { z } from "zod";

const stringOrEmpty = z.string().trim().optional().default("");

export const blogInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title is too long"),
  slug: stringOrEmpty,
  metaTitle: stringOrEmpty,
  metaDescription: stringOrEmpty,
  tags: z.union([z.string(), z.array(z.string())]).optional().default(""),
  keywords: z.union([z.string(), z.array(z.string())]).optional().default(""),
  schemas: z.union([z.array(z.any()), z.string()]).optional().default([]),
  coverImage: stringOrEmpty,
  ogImage: stringOrEmpty,
  content: z.string().trim().min(1, "Content is required")
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});
