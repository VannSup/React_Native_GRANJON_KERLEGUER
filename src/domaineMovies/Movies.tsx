import * as React from 'react';
import {Movie, ApiResult} from './tools/types';
import {get} from './tools/get';

const getMovies = (page = 1, hitsPerPage = 1, query = '') =>
  get<ApiResult>('/query', {page, hitsPerPage, query});

const useMovies = (
  page: number,
  limit: number,
  query: string,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [firstLoading, setFirstLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [nbPage, setNbPage] = React.useState(0);

  //#region Si la recherche est modifier on charge le premiere jeux de donnée
  React.useEffect(() => {
    setMovies([]);
    setPage(0);
    let cancel = false;
    setFirstLoading(true);
    getMovies(page, limit, query).then(data => {
      if (!cancel) {
        setMovies(data.hits);
        setFirstLoading(false);
        setNbPage(data.nbPages);
      }
    });
    return () => {
      cancel = true;
    };
  }, [query]);
  //#endregion

  //#region Si on demande a load plus de donnée (modification de page)
  React.useEffect(() => {
    let cancel = false;
    setLoading(true);

    getMovies(page, limit, query).then(data => {
      if (!cancel) {
        setMovies(movies.concat(data.hits));
        setLoading(false);
        setNbPage(data.nbPages);
      }
    });
    return () => {
      cancel = true;
    };
  }, [page]);
  //#endregion

  return {movies, nbPage, loading, firstLoading};
};

export default useMovies;
