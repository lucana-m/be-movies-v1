import {
  movieCreateSchema,
  returnAllMoviesSchema,
  returnMovieSchema,
} from "../schemas/moviesSchemas";
import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";

export type iMovieCreate = z.infer<typeof movieCreateSchema>;
export type MovieReturn = z.infer<typeof returnMovieSchema>;
export type iMovieRepo = Repository<Movie>;
export type MoviesReturn = z.infer<typeof returnAllMoviesSchema>;
export type iMovieUpdate = DeepPartial<Movie>;
export interface iMovieList {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: MoviesReturn;
}
