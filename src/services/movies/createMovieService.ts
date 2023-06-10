import { iMovieCreate, MovieReturn, iMovieRepo } from "../../interfaces";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { returnMovieSchema } from "../../schemas/moviesSchemas";
import { AppError } from "../../errors";

export const createMovieService = async (
  movieData: iMovieCreate
): Promise<MovieReturn> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const movieName = movieData.name;
  const findMovie = await movieRepository.findOneBy({
    name: movieName,
  });

  if (findMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  const newMovie = returnMovieSchema.parse(movie);

  return newMovie;
};
