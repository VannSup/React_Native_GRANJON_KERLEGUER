import * as React from 'react';
import {Movie, ApiResult} from './tools/types';
import {get} from './tools/get';

const getMovies = (page = 1, limit = 20, query = '') =>
  get<ApiResult>('', `page=${page}&hitsPerPage=${limit}&query=${query}`);

const useMovies = (page: number, limit: number, query: string) => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [nbPage, setNbPage] = React.useState(0);

  React.useEffect(() => {
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
  }, [query, page]);

  return {movies, loading, nbPage};
};

export default useMovies;
