import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movieControllers";
import { verifyDataMiddleware } from "../middlewares/verifyDataMiddleware";
import { verifyMovieExistsMiddleware } from "../middlewares/verifyMovieExistsMiddleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/moviesSchemas";

export const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  verifyDataMiddleware(movieCreateSchema),
  createMovieController
);
movieRoutes.get("", listMoviesController);
movieRoutes.patch(
  "/:id",
  verifyDataMiddleware(movieUpdateSchema),
  verifyMovieExistsMiddleware,
  updateMovieController
);
movieRoutes.delete("/:id", verifyMovieExistsMiddleware, deleteMovieController);
