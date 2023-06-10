import { Request, Response } from "express";
import { iMovieCreate, iMovieUpdate } from "../interfaces";
import { createMovieService } from "../services/movies/createMovieService";
import { deleteMovieService } from "../services/movies/deleteMovieService";
import { listMoviesService } from "../services/movies/listMoviesService";
import { updateMovieService } from "../services/movies/updateMovieService";

export const createMovieController = async (
  request: Request,
  response: Response
) => {
  const movieData: iMovieCreate = request.body;
  const newMovie = await createMovieService(movieData);

  return response.status(201).json(newMovie);
};

export const listMoviesController = async (
  request: Request,
  response: Response
) => {
  const data = request.query;

  const movies = await listMoviesService(data);

  return response.json(movies);
};

export const updateMovieController = async (
  request: Request,
  response: Response
) => {
  const movieData: iMovieUpdate = request.body;
  const idMovie = parseInt(request.params.id);

  const updatedMovie = await updateMovieService(movieData, idMovie);

  return response.json(updatedMovie);
};

export const deleteMovieController = async (
  request: Request,
  response: Response
) => {
  const idMovie = parseInt(request.params.id);
  await deleteMovieService(idMovie);

  return response.status(204).send();
};
