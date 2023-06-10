import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { AppError } from "../../errors";
import { iMovieRepo, iMovieUpdate, MovieReturn } from "../../interfaces";
import { returnMovieSchema } from "../../schemas/moviesSchemas";

export const updateMovieService = async (
  movieData: iMovieUpdate,
  idMovie: number
): Promise<MovieReturn> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const currentMovie = await movieRepository.findOneBy({
    id: idMovie,
  });

  const currentMovieName = currentMovie!.name;

  const allMovies = await movieRepository.find();

  const verifyMovieNameExists = allMovies.find((movie) => {
    return movie.name === movieData.name;
  });

  if (verifyMovieNameExists !== undefined) {
    throw new AppError("Movie already exists.", 409);
  }

  const newData = movieRepository.create({
    ...currentMovie,
    ...movieData,
  });

  const teste = await movieRepository.save(newData);

  const updatedMovie = returnMovieSchema.parse(newData);

  return updatedMovie;
};
