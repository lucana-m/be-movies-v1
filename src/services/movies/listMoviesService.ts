import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMovieList, iMovieRepo, MoviesReturn } from "../../interfaces";

export const listMoviesService = async (data: any): Promise<iMovieList> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const page: number = Number(data.page) <= 0 ? 1 : Number(data.page) || 1;
  const perPage: number =
    Number(data.perPage) > 0 && Number(data.perPage) <= 5
      ? Number(data.perPage)
      : 5 || 5;

  const order: "asc" | "desc" =
    data.order === undefined || data.order === null || data.sort === undefined
      ? "asc"
      : data.order || "asc";
  const sort: "id" | "duration" | "price" =
    data.sort !== "duration" && data.sort !== "price"
      ? "id"
      : data.sort || "id";

  let resultPagination: MoviesReturn;

  if (sort === "duration") {
    resultPagination = await movieRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
      order: {
        duration: order,
      },
    });
  } else if (sort === "price") {
    resultPagination = await movieRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
      order: {
        price: order,
      },
    });
  } else {
    resultPagination = await movieRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
      order: {
        id: order,
      },
    });
  }

  const count: number = await movieRepository.count();

  const previousPage: string | null =
    page === 1
      ? null
      : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string | null =
    count <= perPage * page
      ? null
      : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`;

  const objectReturn: iMovieList = {
    count: count,
    data: resultPagination,
    nextPage: nextPage,
    prevPage: previousPage,
  };

  return objectReturn;
};
