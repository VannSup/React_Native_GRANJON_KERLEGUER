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
  const [loading, setLoading] = React.useState(false);
  const [nbPage, setNbPage] = React.useState(0);

  React.useEffect(() => {
    let newMovies: Movie[] = [];
    setMovies(newMovies);
    //#region
    console.log(
      'Ligne 22 fichier src/domaineMovies/Movies.tsx' +
        '\n Recherche : ' +
        query +
        '\n Varriable : ' +
        newMovies.map(movie => '\n' + movie.title) +
        '\n Ancienne varriable : ' +
        movies.map(movie => '\n' + movie.title),
    );
    //#endregion
    setPage(0);
    let cancel = false;
    setLoading(true);

    getMovies(page, limit, query).then(data => {
      if (!cancel) {
        setMovies(data.hits);
        setLoading(false);
        setNbPage(data.nbPages);
      }
    });
    return () => {
      cancel = true;
    };
  }, [query]);

  React.useEffect(() => {
    let cancel = false;
    setLoading(true);

    getMovies(page, limit, query).then(data => {
      if (!cancel) {
        setMovies(movies.concat(data.hits));
        setLoading(false);
        setNbPage(data.nbPages);
        //#region
        console.log(
          'Ligne 40 fichier src/domaineMovies/Movies.tsx' +
            '\n Recherche : ' +
            query +
            '\n Film present : ' +
            movies.map(movie => '\n' + movie.title),
        );
        //#endregion
      }
    });
    return () => {
      cancel = true;
    };
  }, [page]);

  return {movies, loading, nbPage};
};

export default useMovies;
