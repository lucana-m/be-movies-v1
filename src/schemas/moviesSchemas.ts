import { z } from "zod";

export const movieCreateSchema = z.object({
  description: z.string().optional().nullable(),
  duration: z.number().int().positive(),
  name: z.string().min(2).max(50),
  price: z.number().int().positive(),
});

export const returnMovieSchema = movieCreateSchema.extend({
  id: z.number(),
});

export const returnAllMoviesSchema = returnMovieSchema.array();

export const movieUpdateSchema = movieCreateSchema.partial();
