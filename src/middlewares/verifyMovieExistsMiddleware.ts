import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { iMovieRepo } from "../interfaces";

export const verifyMovieExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const idMovie = parseInt(request.params.id);

  const findMovie = await movieRepository.findOne({
    where: {
      id: idMovie,
    },
  });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};
