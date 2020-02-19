import * as React from 'react';
import {Movie, ApiResult} from './tools/types';

const useMovie = (objectId: string) => {
  const [movie, setMovies] = React.useState<Movie>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let cancel = false;
    setLoading(true);

    get<Movie>(`/${objectId}`).then(data => {
      if (!cancel) {
        setMovies(data);
        setLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, [objectId]);

  return {movie, loading};
};

import {BASE_URL, API_KEY, APPLICATION_ID} from './tools/const';

export function get<T>(path: string, params: string = '') {
  return fetch(`${BASE_URL}${path}?${params}`, {
    headers: {
      Accept: 'application/json',
      'X-Algolia-Application-Id': APPLICATION_ID,
      'X-Algolia-API-Key': API_KEY,
    },
  }).then<T>(res => res.json());
}

export default useMovie;
